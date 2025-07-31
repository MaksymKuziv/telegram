$(document).ready(function () {
    function updateBatteryUI($battery, level) {
        $battery.removeClass('low medium warning');

        if (level < 21) {
            $battery.addClass('low');
        } else if (level < 80) {
            $battery.addClass('medium');
        }

        if (level < 95) {
            $battery.addClass('warning');
        }

        $battery.find('.battery-percent').text(level);
        $battery.find('.battery-background-box').css('width', level + '%');
    }

    $('.battery').each(function () {
        const level = parseInt($(this).find('.battery-percent').text());
        updateBatteryUI($(this), level);
    });

    $('#battery-slider').on('input', function () {
        const level = parseInt($(this).val());

        $('.battery').each(function () {
            updateBatteryUI($(this), level);
        });
    });

    $('#select-theme').on('change', function () {
        const selectedTheme = $(this).val();
        const $telegramBox = $('.telegram-block');
        const $icons = $('.signal-icon, .wifi-icon');

        if (selectedTheme === 'dark') {
            $telegramBox.addClass('dark');

            $icons.each(function () {
                let src = $(this).attr('src');
                if (!src.includes('dark/')) {
                    src = src.replace('img/', 'img/dark/');
                    $(this).attr('src', src);
                }
            });

        } else {
            $telegramBox.removeClass('dark');

            $icons.each(function () {
                let src = $(this).attr('src');
                src = src.replace('img/dark/', 'img/');
                $(this).attr('src', src);
            });
        }
    });


    $('#signal-choose-select').on('change', function () {
        const signalLevel = $(this).val();

        $('.signal-icon').each(function () {
            let src = $(this).attr('src');

            src = src.replace(/Signal-icon-\d\.svg/, `Signal-icon-${signalLevel}.svg`);

            $(this).attr('src', src);
        });
    });

    $('#wi-fi_select').on('change', function () {
        const wifiLevel = $(this).val();

        $('.wifi-icon').each(function () {
            let src = $(this).attr('src');
            src = src.replace(/Wifi-icon-\d\.svg/, `Wifi-icon-${wifiLevel}.svg`);

            $(this).attr('src', src);
        });
    });

    $('#change-user-photo').on('change', function () {
        const userPhotoNumber = $(this).val();

        $('.user-photo').each(function () {
            let src = $(this).attr('src');
            src = src.replace(/user-photo-\d+\.png/, `user-photo-${userPhotoNumber}.png`);

            $(this).attr('src', src);
        });
    });


    function createMessage(type, text, time) {
        const messageHTML = `
      <div class="message ${type}">
        <div class="bubble">
          <span class="text-message">${text}</span>
          <span class="space"></span>
          <span class="time">${time}</span>
        </div>
      </div>
    `;

        const $lastBlock = $('.chat-window .message-block').last();

        if ($lastBlock.length && $lastBlock.find(`.message.${type}`).length > 0 && $lastBlock.find('.message').last().hasClass(type)) {
            $lastBlock.append(messageHTML);
        } else {
            $('.chat-window').append(`<div class="message-block">${messageHTML}</div>`);
        }
    }

    $('#send_my-message').on('click', function () {
        const text = $('#my-message').val().trim();
        const time = $('#my-time').val().trim();

        if (text && time.length <= 5) {
            createMessage('me', text, time);
            $('#my-message').val('');
            $('#my-time').val('10:15');
        }
    });

    $('#send_their-message').on('click', function () {
        const text = $('#their-message').val().trim();
        const time = $('#their-time').val().trim();

        if (text && time.length <= 5) {
            createMessage('them', text, time);
            $('#their-message').val('');
            $('#their-time').val('10:22');
        }
    });


    $('#battery-select').on('change', function () {
        const $battery = $('.battery');
        $battery.removeClass('show-text charger battery-border');

        const selected = $(this).val();

        if (selected === 'text') {
            $battery.addClass('show-text');
        } else if (selected === 'charger') {
            $battery.addClass('charger');
        } else if (selected === 'both') {
            $battery.addClass('show-text charger');
        } else if (selected === 'standart') {
            $battery.addClass('battery-border');
        }
    });


    $(document).on('input', '.time-input-item', function () {
        let val = $(this).val().replace(/[^0-9]/g, '');

        if (val.length >= 3) {
            val = val.substring(0, 4);
            val = val.slice(0, 2) + ':' + val.slice(2);
        }

        $(this).val(val);
    });


    $('.time-input-item').val($('.time-сhat').text());
    $('.input-name').val($('.user-name').text());
    $('.input-count-message').val($('.message-number').text());
    $('.input-last-visiting').val($('.user-time').text());

    $('.time-input-item').on('input', function () {
        $('.time-сhat').text($(this).val());
    });

    $('.input-name').on('input', function () {
        $('.user-name').text($(this).val());
    });

    $('.input-count-message').on('input', function () {
        $('.message-number').text($(this).val());
    });

    $('.input-last-visiting').on('input', function () {
        $('.user-time').text($(this).val());
    });

});

