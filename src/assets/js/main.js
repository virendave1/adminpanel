$(document).ready(function() {

    $('.as').slick({
      dots: true,
      infinite: false,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
      slidesToShow: 4,
      slidesToScroll: 1,

      responsive: [
    
        {
         breakpoint: 991,
         settings: {
           slidesToShow: 1,
           slidesToScroll: 1
         }
        },
       {
         breakpoint: 700,
         settings: {
           slidesToShow: 1,
           slidesToScroll: 1
         }
       },
       {
         breakpoint: 480,
         settings: {
           slidesToShow: 1,
           slidesToScroll: 1
         }
       }
     ]
   
    });
   

  
    $('.asa').slick({
      dots: false,
      infinite: false,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      cssEase: 'linear'
    });
  
  });

  $(document).ready(function() {
  $(".testimonial").slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: false,
		arrows: true,
		prevArrow: $(".testimonial-carousel-controls .prev"),
		nextArrow: $(".testimonial-carousel-controls .next")
   });
});

$().ready(function(){
  $('.slick-carousel').slick({
    arrows: true,
    centerPadding: "0px",
    dots: true,
    slidesToShow: 1,
    infinite: false
  });
});
function more_products()
{
document.getElementById('more_option_product').style.display='flex';
document.getElementById('more_option_product_1').style.display='flex';
document.getElementById('more_option_product_2').style.display='flex';
document.getElementById('more_option').style.display='none';
document.getElementById('more_option_1').style.display='flex';
document.getElementById('product_sect_2_1').style.display='flex';
}
function collapse_menu_logo()
{
document.getElementById('logo_1_hover').style.display='flex';
document.getElementById('logo_1').style.display='none';
}
function s2_button(){
  document.getElementById('arrivals_link').style.border='none'; 
}
function s1_button(){
  document.getElementById('arrivals_link').style.borderBottom='2vw solid rgb(199, 19, 40)'; 
}
function more_products_1()
{
  document.getElementById('more_option_product_3').style.display='flex';
  document.getElementById('more_option_product_4').style.display='flex';
  document.getElementById('more_option_product_5').style.display='flex';
  document.getElementById('more_option_product_6').style.display='flex';
  document.getElementById('more_option_1').style.display='none';
 
}
function reset(){
  document.getElementById("myForm").reset();
}
function product_price(){
  var price=false;
  if(price==true)
  {
    document.getElementById('p5_price').style.display='flex';
  }
  else
  {
    document.getElementById('p5_price').style.display='none';
  }

}
 function submenu(){
    document.getElementById('inner_submenu').style.display='block';
  }
  
 function submenu1(){
  document.getElementById('inner_submenu').style.display='none';
}


function search(){
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("search_box");
  filter = input.value.toUpperCase();
  table = document.getElementById("example");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
function categorysearch(){
  var input, filter, table, tr, td, i, txtValue;
  
  input = document.getElementById("search_box");
  filter = input.value.toUpperCase();
  table = document.getElementById("example");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
}
function search(){
$(document).ready(function(){
  $("#search_box").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#table_body tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
}
search();
// $(document).ready(function(){
//   $("#search_box").on("keyup", function() {
//     var value = $(this).val().toLowerCase();
//     $("#table_body tr").filter(function() {
//       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//     });
//   });
// });
function getcategory(){
  var category=document.getElementById("Category").value;
  localStorage.setItem("category_id",category);
category_id=localStorage.getItem("category_id");
console.log(category_id);
}

function getdetails(){
  var name=localStorage.getItem("name");
  var email=localStorage.getItem("email");
  document.getElementById("user_name").innerHTML = name;
  document.getElementById("user_email").innerHTML = email;
}
function getprice(){
  var price=document.getElementById("price_value").value;
  if(price_value=="true"){
    document.getElementById("prices").style.display=block;
  }
  else{
    document.getElementById("prices").style.display=none;
  }
}