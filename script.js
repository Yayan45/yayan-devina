//waktu
const until = document.getElementById('count-down').getAttribute('data-time').replace(' ', 'T');
const count = (new Date(until)).getTime();

setInterval(() => {
    const distance = Math.abs(count - (new Date()).getTime());

    document.getElementById('day').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
    document.getElementById('hour').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    document.getElementById('minute').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    document.getElementById('second').innerText = Math.floor((distance % (1000 * 60)) / 1000);
}, 1000);
// send message
function sendMessage() {
    const nama = document.getElementById('nama').value;
    const alamat = document.getElementById('alamat').value;
    const konfirmasi = document.getElementById('konfirmasi').value;
    const jumlah = document.getElementById('jumlah').value;
    const pesan = document.getElementById('pesan').value;

    const url = "https://api.whatsapp.com/send?phone=6283123951548&text=_Konfirmasi%20Kehadiran_%0A%0ANama%20%20%20%20%20%20%20%20%3A%20%20*" + nama + "*%0AAlamat%20%20%20%20%20%20%3A%20%20*" + alamat + "*%0AKehadiran%20%3A%20%20*" + konfirmasi + "*%0AJumlah%20%20%20%20%20%20%3A%20%20*" + jumlah + "*%0Apesan%20%20%20%20%20%20%20%20%3A%20*" + pesan + "*";
    window.open(url);
}

//copy button

function copyText(button) {
    // Mendapatkan teks yang akan disalin dari atribut data-copy pada tombol
    var textToCopy = button.getAttribute('data-copy');

    // Membuat elemen textarea yang tidak terlihat
    var textarea = document.createElement('textarea');
    textarea.value = textToCopy;
    document.body.appendChild(textarea);

    // Memilih teks di dalam textarea
    textarea.select();

    try {
        // Menyalin teks ke clipboard
        var successful = document.execCommand('copy');
        var msg = successful ? 'Nomor rekening telah disalin: ' + textToCopy : 'Gagal menyalin nomor rekening';

        if (successful) {
            // Simpan teks asli dan kelas asli tombol
            var originalText = button.innerText;
            var originalClass = button.className;

            // Mengubah teks tombol menjadi "Sudah Tercopy"
            button.innerText = 'tersalin';
            button.classList.remove('btn-primary');
            button.classList.add('btn-info');

            // Mengembalikan teks dan kelas tombol asli setelah 3 detik
            setTimeout(function () {
                button.innerText = originalText;
                button.className = originalClass;
            }, 1000);
        } else {
            console.error(msg);
        }
    } catch (err) {
        console.error('Oops, unable to copy', err);
    }

    // Menghapus elemen textarea yang tidak terlihat
    document.body.removeChild(textarea);
}




//disable scroll
const rootElement = document.querySelector(":root");
const audioIconWrapper = document.querySelector('.audio-icon-wrapper');
const audioIcon = document.querySelector('.audio-icon-wrapper i');
const song = document.querySelector('#song');
const navbar = document.querySelector('.navbar');

let isPlaying = false;

function disableScroll() {
    scrollTop = window.scrollY || document.documentElement.scrollTop;
    scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    window.onscroll = function () {
        window.scrollTo(scrollTop, scrollLeft);
    }

    rootElement.style.scrollBehavior = 'auto';
}

function enableScroll() {
    window.onscroll = function () { }
    rootElement.style.scrollBehavior = 'smooth';
    // localStorage.setItem('opened', 'true');
    playAudio();
    navbar.style.display = 'block';
}

function playAudio() {
    audioIconWrapper.style.display = 'flex';
    song.play();
    isPlaying = true;
}

audioIconWrapper.onclick = function () {
    if (isPlaying) {
        song.pause();
        audioIcon.classList.remove('bi-disc-fill');
        audioIcon.classList.add('bi-pause-circle');
    } else {
        song.play();
        audioIcon.classList.add('bi-disc-fill');
        audioIcon.classList.remove('bi-pause-circle');
    }

    isPlaying = !isPlaying;
}

// if (!localStorage.getItem('opened')) {
//   disableScroll();
// }
disableScroll();


//nama user
const urlParams = new URLSearchParams(window.location.search);
const nama = urlParams.get('n') || '';
const pronoun = urlParams.get('p') || '';
const namaContainer = document.querySelector('#cover .box span');
namaContainer.innerText = `${pronoun} ${nama}`;

document.querySelector('#nama').value = nama;



//animasi carausel
    $(document).ready(function () {
        $('#carouselGallery').on('slide.bs.carousel', function (e) {
            var $e = $(e.relatedTarget);
            var idx = $e.index();
            var itemsPerSlide = 1; // Number of items per slide
            var totalItems = $('.carousel-item').length;
            
            if (idx >= totalItems - (itemsPerSlide - 1)) {
                var it = itemsPerSlide - (totalItems - idx);
                for (var i = 0; i < it; i++) {
                    // Append slides to end when needed
                    if (e.direction == "left") {
                        $('.carousel-item').eq(i).appendTo('.carousel-inner');
                    } else {
                        $('.carousel-item').eq(0).appendTo('.carousel-inner');
                    }
                }
            }
        });

        // Add animations when the carousel slides
        $('#carouselGallery').on('slide.bs.carousel', function (e) {
            var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
            doAnimations($animatingElems);
        });

        function doAnimations(elems) {
            var animEndEv = 'webkitAnimationEnd animationend';
            elems.each(function () {
                var $this = $(this),
                    $animationType = $this.data('animation');
                $this.addClass($animationType).one(animEndEv, function () {
                    $this.removeClass($animationType);
                });
            });
        }
    });
