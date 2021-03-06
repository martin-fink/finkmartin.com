/*
 *    Copyright 2020 Martin Fink
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

window.onload = () => {
    const $container = document.getElementsByClassName('background-container')[0];

    const backgroundBlurred = $container.getElementsByClassName('background-blurred')[0];

    // Matchs the "url(...)"
    let bigBgSrc = getComputedStyle($container).backgroundImage.match(/url\((.+?)\)/i);

    if (bigBgSrc) {
        // Removes quotations
        bigBgSrc = bigBgSrc[1].replace(/['"]/g, '')

        const img = document.createElement('img');
        img.onload = () => {
            backgroundBlurred.setAttribute('style', 'opacity: 0')
        };
        img.setAttribute('src', bigBgSrc);
    }
};
