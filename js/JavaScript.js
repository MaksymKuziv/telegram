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

        $battery.find('.battery-text').text(level);
        $battery.find('.battery-bacground').css('width', level + '%');
    }

    $('.battery').each(function () {
        const level = parseInt($(this).find('.battery-text').text());
        updateBatteryUI($(this), level);
    });

    $('#battery-range').on('input', function () {
        const level = parseInt($(this).val());

        $('.battery').each(function () {
            updateBatteryUI($(this), level);
        });
    });

    $('#theme-select').on('change', function () {
        const selectedTheme = $(this).val();
        const $telegramBox = $('.telegram-box');
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


    $('#signal-select').on('change', function () {
        const signalLevel = $(this).val();

        $('.signal-icon').each(function () {
            let src = $(this).attr('src');

            src = src.replace(/Signal-icon-\d\.svg/, `Signal-icon-${signalLevel}.svg`);

            $(this).attr('src', src);
        });
    });

    $('#wifi-select').on('change', function () {
        const wifiLevel = $(this).val();

        $('.wifi-icon').each(function () {
            let src = $(this).attr('src');
            src = src.replace(/Wifi-icon-\d\.svg/, `Wifi-icon-${wifiLevel}.svg`);

            $(this).attr('src', src);
        });
    });

    $('#user-photo-select').on('change', function () {
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

        const $lastBlock = $('.chat-window .block-message').last();

        if ($lastBlock.length && $lastBlock.find(`.message.${type}`).length > 0 && $lastBlock.find('.message').last().hasClass(type)) {
            $lastBlock.append(messageHTML);
        } else {
            $('.chat-window').append(`<div class="block-message">${messageHTML}</div>`);
        }
    }

    $('#send-my-message').on('click', function () {
        const text = $('#my-message').val().trim();
        const time = $('#my-time').val().trim();

        if (text && time.length <= 5) {
            createMessage('me', text, time);
            $('#my-message').val('');
            $('#my-time').val('10:15');
        }
    });

    $('#send-their-message').on('click', function () {
        const text = $('#their-message').val().trim();
        const time = $('#their-time').val().trim();

        if (text && time.length <= 5) {
            createMessage('them', text, time);
            $('#their-message').val('');
            $('#their-time').val('10:22');
        }
    });

});

