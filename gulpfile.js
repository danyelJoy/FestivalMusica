const { series, src, dest, watch, parallel } = require('gulp')
const sass = require('gulp-sass')
const  imagemin = require('gulp-imagemin')
const notify  = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//UTILIDADES CSS

const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

//Función que compila SASS

const paths ={
    imagenes: 'src/img/**/*',
    js:'src/js/**/*.js',
}
function css(){
    return src('src/scss/app.scss')
    .pipe(sourcemaps.init() )
    .pipe(sass( {outputStyle: 'expanded'}))
    .pipe( postcss([autoprefixer(),  cssnano()] ))
    .pipe( sourcemaps.write('.') )
    .pipe(dest('./build/css'))
  
}

function minificarcss(){
    return src('src/scss/app.scss')
    .pipe(sass( {outputStyle: 'compressed'}))
    .pipe(dest('.bilds/css'))
}

function javascript(){
    return src(paths.js)
    .pipe(concat('bundle.js'))
    .pipe(dest('./build/js'))

}
function imagenes() {
    return src(paths.imagenes)
    .pipe(imagemin())
    .pipe(dest('./build/img'))
    .pipe(notify({message: 'Imagen Minificada'}));
}
function versionWebp (){
    return src(paths.imagenes)
    .pipe(webp())
    .pipe(dest('./build/img'))
    .pipe(notify({message: 'Version webp lista'}));   
}
function watchArchivos (){
    watch('src/scss/**/*.scss', css); //*= La carpeta actual -** todos los archivos
    watch(paths.js, javascript);
}


exports.css = css;
exports.minificarcss = minificarcss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos;

exports.default = series(css,javascript, imagenes,versionWebp, watch);