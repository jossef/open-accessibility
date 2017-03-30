(function ($) {

    var TEMPLATE = `@@include('./templates/menu.html')`;

    var LOCAL_STORAGE_OPTIONS_KEY = 'open-accessibility-config';


    var UNITS = ['px', 'cm', 'em', 'ex', 'in', 'mm', 'pc', 'pt', 'vh', 'vw', 'vmin'];

    function getUnit(fontSize) {

        fontSize = fontSize || '';
        return UNITS
            .filter(unit=>fontSize.match(new RegExp(unit + '$', 'gi')))
            .pop()

    }

    function isGoogleChrome() {
        var isChromium = window.chrome;
        var winNav = window.navigator;
        var vendorName = winNav.vendor;
        var isOpera = winNav.userAgent.indexOf("OPR") > -1;
        var isIEedge = winNav.userAgent.indexOf("Edge") > -1;

        return (isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera == false && isIEedge == false);
    }

    function isMobileBrowser() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;
        var product = userAgent.substr(0, 4);
        return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(userAgent) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(product);
    }

    function getUserOptions() {
        var data;

        try {
            data = localStorage.getItem(LOCAL_STORAGE_OPTIONS_KEY);
            data = JSON.parse(data);
        }
        catch (e) {
        }

        if (data && typeof data === "object") {
            return data;
        }
        else {
            return {};
        }
    }

    function setUserOptions(options) {
        localStorage.setItem(LOCAL_STORAGE_OPTIONS_KEY, JSON.stringify(options));
    }

    function applyTextZoom(selector, zoom) {
        $(selector)
            .not('.open-accessibility *') // To avoid messing up the menu bar itself
            .each(function () {
                var element = $(this);

                var originalFontSize = element.attr('data-open-accessibility-text-original');
                if (!originalFontSize) {
                    originalFontSize = element.css('font-size');
                    element.attr('data-open-accessibility-text-original', originalFontSize);
                }

                var units = getUnit(originalFontSize) || '';
                var fontSize = parseFloat(originalFontSize) * zoom;

                element.css('font-size', fontSize + units);
            });
    }

    $.fn.openAccessibility = function (customOptions) {
        var element = this;

        customOptions = customOptions || {};

        var defaultOptions = {
            isMenuOpened: false,
            highlightedLinks: false,
            isMobileEnabled: true,
            grayscale: 0,
            brightness: 100,
            contrast: 100,
            maxZoomLevel: 3,
            minZoomLevel: 0.5,
            zoomStep: 0.2,
            zoom: 1,
            cursor: false,
            textSelector: '.open-accessibility-text',
            invert: false
        };

        var userOptions = getUserOptions();
        var initialOptions = $.extend({}, defaultOptions, customOptions);
        var options = $.extend({}, initialOptions, userOptions, customOptions);


        if (!options.isMobileEnabled && isMobileBrowser()) {
            console.log('disabling accessibility plugin due to mobile browser');
            return;
        }

        // -------------

        element.prepend(TEMPLATE);

        var html = $('html');
        var body = $('body');
        var container = $(".open-accessibility");
        var menu = $(".open-accessibility-menu");
        var expandButton = $(".open-accessibility-expand-button");
        var closeButton = $(".open-accessibility-close-button");
        var invertButton = $(".open-accessibility-invert-button");
        var cursorButton = $(".open-accessibility-cursor-button");
        var zoomInButton = $(".open-accessibility-zoom-in-button");
        var zoomOutButton = $(".open-accessibility-zoom-out-button");
        var brightnessButton = $(".open-accessibility-brightness-button");
        var monochromeButton = $(".open-accessibility-monochrome-button");
        var contrastButton = $(".open-accessibility-contrast-button");
        var resetButton = $(".open-accessibility-reset-button");
        var cursorWorkaround = $(".open-accessibility-cursor-workaround");


        html.addClass('open-accessibility-zoom');

        // -------------
        // Brightness
        brightnessButton.click(() => {
            options.brightness += 50;

            if (options.brightness > 150) {
                options.brightness = 50;
            }

            apply();
        });

        // -------------
        // Contrast

        contrastButton.click(() => {
            options.contrast += 50;

            if (options.contrast > 150) {
                options.contrast = 50;
            }

            apply();
        });


        // -------------
        // Grayscale

        monochromeButton.click(() => {
            options.grayscale += 100;
            if (options.grayscale > 100) {
                options.grayscale = 0;
            }
            apply();
        });

        // -------------
        // Reset

        resetButton.click(() => {
            options = $.extend({}, initialOptions);
            options.isMenuOpened = false;

            apply();
        });

        // -------------
        // Zoom

        zoomInButton.click(() => {
            options.zoom = Math.min(options.maxZoomLevel, options.zoom + options.zoomStep);
            apply();
        });

        zoomOutButton.click(() => {
            options.zoom = Math.max(options.minZoomLevel, options.zoom - options.zoomStep);
            apply();
        });

        // -------------
        // Invert

        invertButton.click(() => {
            options.invert = !options.invert;
            apply();
        });

        // -------------
        // Cursor

        cursorButton.click(() => {
            options.cursor = !options.cursor;
            apply();
        });

        // -------------
        // Menu

        expandButton.click(() => {
            options.isMenuOpened = true;
            apply();
        });

        closeButton.click(() => {
            options.isMenuOpened = false;
            apply();
        });

        // Click outside of the menu -> close
        $(document).click((event) => {
            if (!$(event.target).closest('.open-accessibility').length) {
                if (options.isMenuOpened) {
                    options.isMenuOpened = false;
                    apply();
                }
            }
        });

        expandButton.hide();
        menu.hide();

        if (customOptions.isMenuOpened) {
            options.isMenuOpened = true;
            menu.show();
            expandButton.hide();
        }
        else {
            options.isMenuOpened = false;
        }


        // -------------
        // Mouse cursor workaround

        cursorWorkaround.hide();

        var googleChrome = isGoogleChrome();
        if (!googleChrome) {

            $(document).on('mousemove', function (e) {

                if (!options.cursor) {
                    return;
                }

                cursorWorkaround.css({
                    left: e.pageX / options.zoom,
                    top: e.pageY / options.zoom
                });
            });
        }

        // Initialize
        applyTextZoom(options.textSelector, 1);

        apply();

        function apply() {

            // ----------------

            if (options.isMenuOpened) {
                expandButton.fadeOut(300);
                menu.fadeIn(300);

                container.removeClass("open-accessibility-collapsed");
                container.addClass("open-accessibility-expanded");
            }
            else {
                expandButton.fadeIn(300);
                menu.fadeOut(300);

                container.removeClass("open-accessibility-expanded");
                container.addClass("open-accessibility-collapsed");
            }

            // ----------------
            // Filters

            var filters = [];
            if (options.invert) {
                filters.push('invert(1)');
            }

            filters.push('contrast(' + options.contrast + '%)');
            filters.push('brightness(' + options.brightness + '%)');
            filters.push('grayscale(' + options.grayscale + '%)');
            var filterValue = filters.join(' ');
            body.css('filter', filterValue);
            body.css('-ms-filter', filterValue);
            body.css('-moz-filter', filterValue);
            body.css('-webkit-filter', filterValue);
            body.css('-o-filter', filterValue);

            // ----------
            // Zoom
            applyTextZoom(options.textSelector, options.zoom);

            //$('.open-accessibility-zoom').css('transform', 'scale(' + options.zoom + ')');

            // ----------
            // Cursor

            if (options.cursor) {
                html.addClass('open-accessibility-cursor');

                if (!googleChrome) {
                    cursorWorkaround.show();
                }
            }
            else {
                html.removeClass('open-accessibility-cursor');
                if (!googleChrome) {

                    cursorWorkaround.hide();
                }
            }

            setUserOptions(options);
        }

    };

})(jQuery || $);