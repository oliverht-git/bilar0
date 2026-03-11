(function(){
            const slides = Array.from(document.querySelectorAll('.slide'));
            const prevBtn = document.querySelector('.carousel-control.prev');
            const nextBtn = document.querySelector('.carousel-control.next');
            const indicatorsWrap = document.querySelector('.indicators');
            const slidesContainer = document.querySelector('.slides');
            const modal = document.getElementById('modal');
            const modalClose = document.getElementById('modalClose');
            const modalBackdrop = document.getElementById('modalBackdrop');
            const modalImage = document.getElementById('modalImage');
            const modalName = document.getElementById('modalName');
            const modalDesc = document.getElementById('modalDesc');
            const modalPrice = document.getElementById('modalPrice');
            const modalBuy = document.getElementById('modalbuy');

            let current = 0;
            let autoplayInterval = null;

            function createIndicators(){
                slides.forEach((s, i) => {
                    const btn = document.createElement('button');
                    btn.className = 'indicator';
                    btn.dataset.index = i;
                    btn.addEventListener('click', () => showSlide(i));
                    indicatorsWrap.appendChild(btn);
                });
            }

            function updateIndicators(){
                const dots = indicatorsWrap.querySelectorAll('.indicator');
                dots.forEach(d => d.classList.remove('active'));
                if(dots[current]) dots[current].classList.add('active');
            }

            function showSlide(index){
                if(index < 0) index = slides.length - 1;
                if(index >= slides.length) index = 0;
                slides.forEach((s, i) => s.classList.toggle('active', i === index));
                current = index;
                updateIndicators();
                // Scroll the active slide into center view
                const active = slides[current];
                if(active && typeof active.scrollIntoView === 'function'){
                    active.scrollIntoView({behavior: 'smooth', inline: 'center', block: 'nearest'});
                } else if (slidesContainer) {
                    const left = active.offsetLeft - (slidesContainer.clientWidth - active.clientWidth) / 2;
                    slidesContainer.scrollTo({left, behavior: 'smooth'});
                }
            }

            function nextSlide(){ showSlide(current + 1); }
            function prevSlide(){ showSlide(current - 1); }

            prevBtn.addEventListener('click', () => { prevSlide(); resetAutoplay(); });
            nextBtn.addEventListener('click', () => { nextSlide(); resetAutoplay(); });

            slides.forEach((s, i) => {
                s.addEventListener('click', () => openDetails(s));
                s.addEventListener('keydown', (e) => { if(e.key === 'Enter') openDetails(s); });
            });

            function openDetails(slide){
                const name = slide.dataset.name || '';
                const price = slide.dataset.price || '';
                const desc = slide.dataset.desc || '';
                const img = slide.querySelector('img')?.src || '';
                modalImage.src = img;
                modalImage.alt = name;
                modalName.textContent = name;
                modalDesc.textContent = desc;
                modalPrice.textContent = price;
                modalBuy.onclick = () => {
                    alert(`Tack för ditt köp av ${name} för ${price}!`);
                    closeDetails();
                }
                modal.style.display = 'block';
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }

            function closeDetails(){
                modal.style.display = 'none';
                modal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }

            modalClose.addEventListener('click', closeDetails);
            modalBackdrop.addEventListener('click', closeDetails);
            document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeDetails(); });

            function startAutoplay(){
                autoplayInterval = setInterval(nextSlide, 4000);
            }
            function resetAutoplay(){
                clearInterval(autoplayInterval);
                startAutoplay();
            }

            // init
            createIndicators();
            showSlide(0);
            startAutoplay();
        })();
