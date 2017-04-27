$(document).ready(function(){
function fixMenu(){   
        $(window).scroll(function(){
            var winScroll = $(window).scrollTop();
            if(winScroll > 150){
                $('.header-bottom').addClass('menu-fixed');
            }else(
                $('.header-bottom').removeClass('menu-fixed')
            )
        })
    };
    fixMenu();
	
	$('.customer_account').hover(
	  function () {
		$('.customer-box').show();
	  }, 
	  function () {
		$('.customer-box').hide();
	  }
	);
	$("").focusout(function(){
  	});
	
	$('.quick-search-inner input[type="text"]').on('blur', function () {
        $(this).parent().css('border','2px solid #d8d8d8');
    }).on('focus', function () {
        $(this).parent().css('border','2px solid #a5c7fe');
    });

	
	try{
	 var zoomSet = $('#zoom1, .cloud-zoom-gallery')
		zoomSet.CloudZoom({
			smoothMove:8,
			/*position: 'inside',*/
			showTitle:false,
			adjustX:1,
			adjustY:1
		})
	}catch(error){
		//nothig will execute.
	}
	$('.cloud-zoom-gallery').on('click', function(){
		//alert("hi");
		$('.cloud-zoom-gallery').removeClass('active');
		$(this).addClass('active')
	
	})
	
	try{
		var zoomGallery = $('.more-views');
		zoomGallery.owlCarousel({
			navigation: true,
			items:4,
			slideSpeed: 500,
			pagination:false,
			addClassActive: true,
			itemsDesktop : [1000,4],
			itemsDesktopSmall : [900,3],
			itemsTablet: [600,2],
			itemsMobile :[480,1],
			loop:true,
			navigationText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>']
		})
	}catch(error){
		//nothig will execute.
	}
	function ShowLogin() {
		var email = $('#span_email').text();
		var pwd = $('#span_password').text();
		$('#emailAddress').val('');
		$('#password').val('');
		$('#loginerror').css('display','none');
		if(email) {
			$('#span_email').html(''); 
		}
		if(pwd) {
			$('#span_password').html('');
		}
        $('#logion-model').modal("show");
    }
    function Showcart() {
	   $('#Addtocart').modal("show"); 	
	}	
	$("#addtocart").click(function(){
	   Showcart();	
	});	
	
	 function Showwishlist() {
	   $('#Addtowishlist').modal("show"); 	
	}	
	$("#addtowishlist").click(function(){
	   Showwishlist();	
	});	
   // function CloseChooseLocation() {
       // $('#logion-model').modal("hide");
   // }
    $("#checklogin").click(function(){
		ShowLogin();
    });
    
    $("#loginwishlist").click(function(){
		ShowLogin();
		$('#routedashboard').val($(this).data('attr'));
    });
    $("#accountchecklogin").click(function(){
		ShowLogin();
		$('#routedashboard').val($(this).data('attr'));
    });
     $("#accountchecklogin1").click(function(){
		ShowLogin();
		$('#routedashboard').val($(this).data('attr'));
    });
     $("#accountchecklogin2").click(function(){
		ShowLogin();
		$('#routedashboard').val($(this).data('attr'));
    });
     $("#accountchecklogin3").click(function(){
		ShowLogin();
		 $('#routedashboard').val($(this).data('attr'));
    });
     $("#accountchecklogin4").click(function(){
		ShowLogin();
		$('#routedashboard').val($(this).data('attr'));
    });
    
    $("#reviewlogin").click(function(){
		ShowLogin();
		$('#routedashboard').val($(this).data('attr'));
		$('#proid').val($(this).data('prid'));
    });
  
	$("#newuserlogin1").click(function(){
		$('#logion-model').modal("hide");
		$('#new-logion-model').modal("show");
	});
	$(".wishlistLogin").click(function(){
		ShowLogin();
		$('#proid').val($(this).data('pid'));
		$('#routedashboard').val($(this).data('attr'));
    });
	 $("#loginsignup").click(function(){
		$('.help-block').css('display','none');
		$('.form-control').css('border','1px solid #ccc');
		$('#firstName').val('');
		$('#lastName').val('');
		$('#email').val('');
		$('#password').val('');
		$('#new-logion-model').modal("show");
    });
	
	
	/*function adjustModalMaxHeightAndPosition() {
		$('.modal').each(function () {
			if ($(this).hasClass('in') === false) {
				$(this).show();
			}
			var contentHeight = $(window).height() - 60;
			var headerHeight = $(this).find('.modal-header').outerHeight() || 2;
			var footerHeight = $(this).find('.modal-footer').outerHeight() || 2;
			$(this).find('.modal-dialog').addClass('modal-dialog-center').css({
				'margin-top': function () {
					return -($(this).outerHeight() / 2);
				},
				'margin-left': function () {
					return -($(this).outerWidth() / 2);
				}
			});
			if ($(this).hasClass('in') === false) {
				$(this).hide();
			}
		});
	}
	if ($(window).height() >= 420) {
		$(window).resize(adjustModalMaxHeightAndPosition).trigger('resize');
	}*/
	
	
   

	
	
	
})

