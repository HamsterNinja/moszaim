import gulp from 'gulp';

import { scripts } from './gulp-tasks/webpack';
import { server, browser }  from './gulp-tasks/server';
import { styles }  from './gulp-tasks/styles';
import { templates }  from './gulp-tasks/templates';

function watchFiles() {
    gulp.watch('./views/partials/*.twig', templates);
    gulp.watch('./views/*.twig', templates);
    gulp.watch('./assets/scss/*.scss', styles);
    gulp.watch('./assets/scss/*/*.scss', styles);
    gulp.watch('./config/global.json', scripts);
    gulp.watch('./views/partials/*.twig').on('change', () => browser.reload());
    gulp.watch('./views/*.twig').on('change', () => browser.reload());
    gulp.watch('./config/global.json').on('change', () => browser.reload());

    gulp.watch('./assets/scss/*.scss').on('change', () => browser.reload());
    gulp.watch('./assets/scss/*/*.scss').on('change', () => browser.reload());
}

export const dev = gulp.parallel( server, styles, templates, watchFiles );
export const build = gulp.series( scripts, styles, templates );

export default dev;
