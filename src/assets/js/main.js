(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    // Spinner
    setTimeout(() => {
      const spinner = document.getElementById('spinner');
      if (spinner) spinner.classList.remove('show');
    }, 1);

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
      window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
      });
      backToTop.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Sidebar Toggler
    const sidebarToggler = document.querySelector('.sidebar-toggler');
    if (sidebarToggler) {
      sidebarToggler.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.sidebar, .content').forEach(el => el.classList.toggle('open'));
      });
    }

    // Progress Bar with IntersectionObserver
    const pgBar = document.querySelector('.pg-bar');
    if (pgBar) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            document.querySelectorAll('.progress .progress-bar').forEach(bar => {
              const val = bar.getAttribute('aria-valuenow');
              bar.style.width = val + '%';
            });
            observer.disconnect();
          }
        });
      }, { threshold: 0.2 });
      observer.observe(pgBar);
    }

    // Calendar (requires flatpickr)
    if (window.flatpickr && document.getElementById('calender')) {
      flatpickr('#calender', { inline: true, dateFormat: 'Y-m-d' });
    }

    // Testimonials carousel (requires Swiper)
    if (window.Swiper) {
      new Swiper('.testimonial-carousel', {
        autoplay: { delay: 3000 },
        loop: true,
        pagination: { el: '.swiper-pagination', clickable: true }
      });
    }

    // Chart.js helper
    function makeChart(selector, type, data, options = {}) {
      const canvas = document.querySelector(selector);
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      return new Chart(ctx, { type, data, options: Object.assign({ responsive: true }, options) });
    }

    // Worldwide Sales Chart
    makeChart('#worldwide-sales', 'bar', {
      labels: ['2016','2017','2018','2019','2020','2021','2022'],
      datasets: [
        { label: 'USA',    data: [15,30,55,65,60,80,95], backgroundColor: 'rgba(0,156,255,0.7)' },
        { label: 'UK',     data: [8,35,40,60,70,55,75],   backgroundColor: 'rgba(0,156,255,0.5)' },
        { label: 'AU',     data: [12,25,45,55,65,70,60],  backgroundColor: 'rgba(0,156,255,0.3)' },
      ]
    });

    // Sales & Revenue Chart
    makeChart('#salse-revenue', 'line', {
      labels: ['2016','2017','2018','2019','2020','2021','2022'],
      datasets: [
        { label: 'Sales',   data: [15,30,55,45,70,65,85],   backgroundColor: 'rgba(0,156,255,0.5)', fill: true },
        { label: 'Revenue', data: [99,135,170,130,190,180,270], backgroundColor: 'rgba(0,156,255,0.3)', fill: true },
      ]
    });

    // Single Line Chart
    makeChart('#line-chart', 'line', {
      labels: [50,60,70,80,90,100,110,120,130,140,150],
      datasets: [{ label: 'Sales', data: [7,8,8,9,9,9,10,11,14,14,15], fill: false, backgroundColor: 'rgba(0,156,255,0.3)' }]
    });

    // Single Bar Chart
    makeChart('#bar-chart', 'bar', {
      labels: ['Italy','France','Spain','USA','Argentina'],
      datasets: [{ data: [55,49,44,24,15], backgroundColor: ['rgba(0,156,255,0.7)','rgba(0,156,255,0.6)','rgba(0,156,255,0.5)','rgba(0,156,255,0.4)','rgba(0,156,255,0.3)'] }]
    });

    // Pie Chart
    makeChart('#pie-chart', 'pie', {
      labels: ['Italy','France','Spain','USA','Argentina'],
      datasets: [{ data: [55,49,44,24,15], backgroundColor: ['rgba(0,156,255,0.7)','rgba(0,156,255,0.6)','rgba(0,156,255,0.5)','rgba(0,156,255,0.4)','rgba(0,156,255,0.3)'] }]
    });

    // Doughnut Chart
    makeChart('#doughnut-chart', 'doughnut', {
      labels: ['Italy','France','Spain','USA','Argentina'],
      datasets: [{ data: [55,49,44,24,15], backgroundColor: ['rgba(0,156,255,0.7)','rgba(0,156,255,0.6)','rgba(0,156,255,0.5)','rgba(0,156,255,0.4)','rgba(0,156,255,0.3)'] }]
    });
  });
})();
