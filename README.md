# ネスト
同じセレクタを何度も記述せずに済むのでコードの可読性が良くなる  
ただし、あまりにも深すぎるネストは逆効果なので適度に用いることが重要

### ■scss
```scss
.main {
  width: 600px;
  p {
    margin-bottom: 1.5em;
    span{
      font-weight:bold;
    }
  }
}
```
### ■css
```scss
.main{
  width:600px;
}
.main p{
  margin-bottom:1.5em;
}
.main p span{
  font-weight:bold;
}
```

# @at-rootでネスト解除
セレクタの前に記述するとネストを解除してrootにコンパイルできる  
しかしコンパイル後の形態が想定しづらいためあまりお勧めできない

### ■scss
```scss
.main{  
  width: 600px;
  @at-root p { //この部分が.mainを解除してrootになる
    margin-bottom: 1.5em;
    span{ //@at-rootの子要素なので一緒に解除される
      font-weight:bold;
    }
  }
}
```
### ■css
```scss
.main{
  width:600px;
}
p{
  margin-bottom:1.5em;
}
p span{
  font-weight:bodl;
}
```

# 親要素の参照(&)
セレクタの前後に&を付けると親要素を参照して渡すことができる

### ■scss
```scss
a{  
  color:#000;
  &:hover{
    color:#ff0;
  }
  .button &{
    width:100px;
  }
}
```
### ■css
```scss
a{
  color:#000;
}
a:hover{
  color:#ff0;
}
.button a{
  width:100px;
}
```

# 演算子
使える演算子は限られるが、何かと便利なので覚えておくこと推奨  
比較演算子や論理演算子も使用可能（後述）  
+=や++などは使えない

|+|-|*|/|%|
|:--:|:--:|:--:|:--:|:--:|
|加算|減算|乗算|除算|余り|

### ■scss

```scss
.wrapper{
  width:(900 / 3) + px;
}
```
### ■css
```scss
.wrapper {
  width: 300px;
}
```

# 変数
プログラミングのように変数に値を格納しそれを参照することができる  
カラーコード、数値、文字列の他、配列のような複数の値セットや演算も可能  
クラス名などで変数展開する場合はインターポレーションを使う→`#{}`  

### ■scss
```scss
//宣言は$で、:で代入
$a:900;
$b:10;
$c:$a/$b;

.wrapper#{$c}{
  width:$c + px;
}
```
### ■css
```scss
.wrapper90{
  width: 90px;
}
```

# @extend
既にあるクラスを継承して拡張したり上書きする時に使う  
同じスタイルを何度も記述せずに済むので、共通パーツやclear fixによく使われる

### ■scss
```scss
//定義側
.clrfix{
  &::after{
    visibility:hidden;
    display:block;
    font-size:0;
    content:" ";
    clear:both;height:0;
  }
}
//継承側
.container{
  @extend .clrfix;
}
```
### ■css
```scss
.clrfix::after,
.container::after{
  visibility:hidden;
  display:block;
  font-size:0;
  content:" ";
  clear:both;height:0;
}
```

# @if
ディレクティブも柔軟に使えるが、あまり複雑にしすぎるとチーム開発が困難になるのでシンプル設計を心がける  
条件によって出し分けをしたい時に便利 

### ■scss
```scss
$a:10;

h1{
  @if $a < 100{
    font-size:10px;
  }@else {
    font-size:12px;
  }
}
```
### ■css
```scss
h1{
  font-size:10px;
}
```

# @for
1つずつ順番に処理をする  
クラス名に連番を付けるなど、数字を1つずつカウントする時にも使える

### ■scss
```scss
@for $i from 1 through 3{ //throughをtoにすると3未満までになる
  .text#{$i}{
    font-size:#{$i}px;
  }
}
```
### ■css
```scss
.text1 {
  font-size: 1px;
}
.text2 {
  font-size: 2px;
}
.text3 {
  font-size: 3px;
}
```

# @while
@forと同じ繰り返し処理をする関数だが、カウントアップ・ダウンの条件を変えてループできる

### ■scss
```scss
$i:2;
@while $i <= 8{
    .box#{$i}{
        width:$i + px;
    }
    $i:$i + 2;
}
```
### ■css
```scss
.box2 {
  width: 2px;
}
.box4 {
  width: 4px;
}
.box6 {
  width: 6px;
}
.box8 {
  width: 8px;
}

```

# @each
配列の繰り返し処理ができる

### ■scss
```scss
$array: (
      1: 'りんご',
      2: 'ぶどう',
      3: 'なし'
      );

@each $k, $v in $array{
  .fruit#{$k}{
    content: $v;
    
  }
}
```
### ■css
```scss
.fruit1 {
  content: "りんご";
}

.fruit2 {
  content: "ぶどう";
}

.fruit3 {
  content: "なし";
}

```

# @mixin
ユーザー定義関数  
複雑な処理をまとめて定義し、関数として呼び出すことでcssを生成する

### ■scss
```scss
@mixin button-base($width,$height){
  .button{
    width:$width;
    height: $height;
    display: inline-block;
  }
}
//mixinの呼び出しは@include 関数名
@include button-base(40,30);
```
### ■css
```scss
.button {
  width: 40;
  height: 30;
  display: inline-block;
}
```

# @function
mixinに似ているが、値のみをリターンするという制限がある

### ■scss
```scss
@function plus($n,$m){
  @return $n + $m;
}
//呼び出し
.box{
  width:plus(100,100) + px;
}
```
### ■css
```scss
.box{
  width:200px;
}
```

# グローバル汚染に配慮する
ディレクティブやユーザー定義関数を実際のcssと織り交ぜて使うと煩雑になり、デバッグもしづらいためメンテナンスに向いていない  
ロジックとcssは分離して記述することを心がける  
また、関数が被らないよう、関数専用のファイルを用意して一箇所にまとめるとミスが起きづらい

### ■scss
```scss
/*----------------------------------------------------------------------------------------------------------
cssに直接ロジックが記述してあるので可読性が低く、メンテナンスしづらい
また、変数もグローバル変数になってしまいがちなのでミスが起きやすくデバッグがしづらい
----------------------------------------------------------------------------------------------------------*/


//----------------------------------------------------
//他のcssと同じファイル内に記述したもの
//----------------------------------------------------
$i:1;
@while $i <= 6{
  .box#{$i}{
    width:$i + px;
  }
  $i:$i + 2;
}
```

### ■scss

```scss
/*----------------------------------------------------------------------------------------------------------
ロジックを分離してあるので、メインのcssを汚すことはない
ロジック側は引数を使い、呼び出し側に値をセットすることで関数の使い回しがしやすくなる
----------------------------------------------------------------------------------------------------------*/


//----------------------------------------------------
//mixin.scss
//----------------------------------------------------
@mixin box($n,$s){
  $i:1;
  @while $i <= $n{
    .box#{$i}{
      width:$i + px;
    }
    $i:$i + $s;
  }
}
//----------------------------------------------------
//main.scss
//----------------------------------------------------
//関数の呼び出し
@include box(6,2);
```
### ■css
```scss
//css内に記述したもの
.box1 {
  width: 1px;
}
.box3 {
  width: 3px;
}
.box5 {
  width: 5px;
}
//別ファイルで関数化して呼び出したもの
.box1 {
  width: 1px;
}
.box3 {
  width: 3px;
}
.box5 {
  width: 5px;
}
```

# パーシャル
configやグローバル変数の定義など、ロジックの分離以外にもファイルを分けた方が管理しやすいケースがある  
そんな時はコンパイル時に生成されないパーシャルファイルを使うのが便利  
ファイル名の先頭にアンダースコアを付与し、それをメインとなるファイルでimportする

```scss
//----------------------------------------------------
//_config.scss
//----------------------------------------------------
$support-ie6:false;
$support-ie7:false;
$support-ie8:true;
//----------------------------------------------------
//_common.scss
//----------------------------------------------------
$font-size:13px;
$color:#000;
$img-path:"../img/"
//----------------------------------------------------
//main.scss
//----------------------------------------------------
@import "config";
@import "common";
//importする時はアンダースコアと拡張子は不要
```

# その他の便利な使い方
用意されている関数や便利な使い方は他にもたくさんあるので、下記のURL参考にしてください

* [sassの抑えておきたいfunctionの使い方](http://developers.linecorp.com/blog/?p=845)
* [Sass の基本的な使い方のメモ](http://www.webdesignleaves.com/wp/htmlcss/270/)