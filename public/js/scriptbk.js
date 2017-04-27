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

        $('#logion-model').modal("show");
    }
	
   /* function CloseChooseLocation() {
        $('#logion-model').modal("hide");
    }*/
    $("#checklogin").click(function(){
		ShowLogin();
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
  
	$("#newuserlogin1").click(function(){
		$('#logion-model').modal("hide");
		$('#new-logion-model').modal("show");
	});
	 $("#loginsignup").click(function(){
		$('#new-logion-model').modal("show");
    });
	
	
	function adjustModalMaxHeightAndPosition() {
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
	if ($(window).height() >= 320) {
		$(window).resize(adjustModalMaxHeightAndPosition).trigger('resize');
	}
	
	
	
	
})

