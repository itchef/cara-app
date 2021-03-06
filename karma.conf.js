/*
 * Cara APP is front end application for Cara application which gets supported by Cara API, which is a face cheat book for organisation
 *
 * Copyright (c) 2018 ITChef.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 * along with this program.  If not, see [https://www.gnu.org/licenses/](https://www.gnu.org/licenses/).
 *
 * @author Kaustav Chakraborty
 */

process.env.CHROMIUM_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular/cli'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('karma-spec-reporter'),
            require('@angular/cli/plugins/karma')
        ],
        client:{
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageIstanbulReporter: {
            reports: [ 'html', 'lcovonly', 'text-summary' ],
            fixWebpackSourcePaths: true,
            thresholds: {
                global: {
                    statements: 20,
                    lines: 20,
                    branches: 20,
                    functions: 20
                },
                each: {
                    statements: 0,
                    lines: 0,
                    branches: 0,
                    functions: 0
                }
            }
        },
        angularCli: {
            environment: 'dev'
        },
        reporters: config.angularCli && config.angularCli.codeCoverage
            ? ['progress', 'spec', 'coverage-istanbul']
            : ['progress', 'spec', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    });
};
