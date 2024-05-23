document.addEventListener("DOMContentLoaded", function () {
    var scrollbar = document.body.clientWidth - window.innerWidth + 'px';
    document.querySelector('[href="#openModal"]').addEventListener('click', function () {      
      let days = localStorage.getItem('dayCount');
      let h2 = document.querySelector('.modal-body h2');
      h2.innerHTML = `You will lose a ${days} days streak💦`
        
      const result = todoItems.find((o)=>{
        if(o.checked === true) 
          return true;
        else 
          return false;
      });
      document.body.style.overflow = 'hidden';      
      document.querySelector('#openModal').style.marginLeft = scrollbar;
    });


    document.querySelector('[href="#close"]').addEventListener('click', function () {
      document.body.style.overflow = 'visible';
      document.querySelector('#openModal').style.marginLeft = '0px';
    });


    document.querySelector('[href="#yes"]').addEventListener('click', function () {
      let days = localStorage.getItem('dayCount');
      days++;
      //localStorage.setItem('dayCount', days);
      localStorage.setItem('dayCount', 0);
      let c = new Cal("divCal");
      clearTodo();
      c.nextMonth();        
      document.body.style.overflow = 'visible';
      document.querySelector('#openModal').style.marginLeft = '0px';        
    });
    document.querySelector('[href="#no"]').addEventListener('click', function () {
      document.body.style.overflow = 'visible';
      document.querySelector('#openModal').style.marginLeft = '0px';
    });
  });