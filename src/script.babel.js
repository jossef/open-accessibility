(function ($) {

    var TEMPLATE = `@@include('./templates/menu.html')`;

    var LOCAL_STORAGE_OPTIONS_KEY = 'open-accessibility-config';

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

    $.fn.accessibility = function (customOptions) {
        var element = this;
        element.prepend(TEMPLATE);

        var html = $('html');
        var container = $(".open-accessibility");
        var menu = $(".open-accessibility-menu");
        var tooltip = $(".open-accessibility-tooltip");
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

        var defaultOptions = {
            isMenuOpened: false,
            highlightedLinks: false,
            grayscale: 0,
            brightness: 100,
            contrast: 100,
            maxZoomLevel: 5,
            minZoomLevel: 0,
            zoomStep: 0.2,
            zoom: 1,
            cursor: false,
            invert: false
        };

        var userOptions = getUserOptions();
        var initialOptions = $.extend({}, defaultOptions, customOptions);
        var options = $.extend({}, initialOptions, userOptions);


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
            options.isMenuOpened = true;

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

        tooltip.hide();
        expandButton.hover(
            () => {
                tooltip.finish().delay(500).fadeIn(150);
            },
            () => {
                tooltip.stop().fadeOut(300).finish();
            });

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


        if (options.isMenuOpened && customOptions.isMenuOpened) {
            menu.show();
            expandButton.hide();
        }
        else {
            options.isMenuOpened = false;
        }

        // -------------


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
            html.css('filter', filters.join(' '));

            // ----------
            // Zoom

            html.css('zoom', options.zoom);

            // ----------
            // Cursor

            if (options.cursor) {
                html.addClass('open-accessibility-cursor');
            }
            else {
                html.removeClass('open-accessibility-cursor');
            }

            setUserOptions(options);
        }

    };

})(jQuery || $);