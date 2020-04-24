/*
 * Created: Fri Apr 24 2020
 * Author: Apple
 */

module.exports = function(grunt) {
  grunt.initConfig({
    i18next: {
      dev: {
        src: ['src/**/*.{jsx,js}'],
        dest: 'src',
        options: {
          lngs: ['en', 'zh'],
          removeUnusedKeys: true,
          sort: false,
          keySeparator: false,
          nsSeparator: false,
          interpolation: {
            prefix: '{{',
            suffix: '}}',
          },
          resource: {
            loadPath: 'src/locales/{{lng}}/{{ns}}.json',
            savePath: 'locales/{{lng}}/{{ns}}.json',
          },
          func: {
            list: ['t'],
            extensions: ['.js', '.jsx'],
          },
          defaultValue: (lng, ns, key) => {
            if (lng === 'zh') {
              return ''
            }
            return key
          },
        },
      },
    },
  })

  // Load the plugin that provides the "i18next" task.
  grunt.loadNpmTasks('i18next-scanner')

  // Default task(s).
  grunt.registerTask('default', ['i18next'])
}
