var url = 'http://'+window.location.host+'/';

$(document).ready(function(){	
	$('#tabs').tab();
	var shippingDetails 	= $('#shipping_information_details');
	var productQuantity 	= $('#product_quantity');
	var checkoutUserEmail 	= $('#checkout-user-email');
	var checkoutStep1		= $('#step1');
	var checkoutStep2 		= $('#step2');
	var checkoutStep3		= $('#step3');
	var checkoutStep4 		= $('#step4');
	var url 				= 'http://'+window.location.host+'/';
	
	$(".chageVariants").change(function(){
			var dataString = 'getVariantCombination/'+$(this).val()+'/'+$(this).data('variant'); 
			var attributeNumber = $(this).data('variant');  
			$.ajax({
				type: "POST",
				url: url+dataString,
				contentType: "application/json; charset=utf-8",
				dataType: "html",
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					
				},
				success:function(result) {
					
					if(attributeNumber == 1) {
						
					   $("#divattribute_"+2).html(result);
					}
					if(attributeNumber == 2) {
						
					   $("#divattribute_"+1).html(result);
					}
				},
			});
	});
	
	

	
	$("#atcfpd").click(function(){		
	  var qty = productQuantity.val();
	 
		if($('#attribute_1').length > 0 && $('#attribute_1').val()=="") {
				$('#error_attribute_1').text("Please Select Attribute "+$('#attribute_1').data('attrval')+".");
				return false;
		}
		else if($('#attribute_2').length > 0 && $('#attribute_2').val()=="") {
				$('#error_attribute_2').text("Please Select Attribute "+$('#attribute_2').data('attrval')+".");return false;
		}
		else if($('#attribute_3').length > 0 && $('#attribute_3').val()=="") {
				$('#error_attribute_3').text("Please Select Attribute "+$('#attribute_3').data('attrval')+".");return false;
		}
		if (qty == "" || qty < 1) {
			productQuantity.focus();

			$('#error_product_quantity').text("Please enter quantity.");
			return false;
		} 
		else {
			var attr1='n',attr2='n',attr3='n';
			if($('#attribute_1').length > 0 && $('#attribute_1').val()!="")
				var attr1 = $('#attribute_1').val();
			if($('#attribute_2').length > 0 && $('#attribute_2').val()!="")
				var attr2 = $('#attribute_2').val();
			if($('#attribute_3').length > 0 && $('#attribute_3').val()!="")
				var attr3 = $('#attribute_3').val();
		    
		    var pID = $('#product_id').val();
			var dataString = 'checkInventory/'+pID+'/'+attr1+'/'+attr2+'/'+attr3; 
			$.ajax({
				type: "POST",
				url: url+dataString,
				contentType: "application/json; charset=utf-8",
				dataType: "html",
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					
				},
				success:function(result) {
					
					if(result < qty ) {
						productQuantity.focus();
						productQuantity.val('');
						$('#error_product_quantity').text(qty +" products not in stock");
					}					
					else {	
						//$("#addToCart").submit();
					var dataString = 'addToCart';		
					//window.location = url+dataString;
						$.ajax({
					   type: "POST",
					   data: $("#addToCart").serialize(),				   
					   url: "/addToCart", // the URL of the controller action method
					   success: function(result) {						  
						 $('#quick-cart').css('display','block');
						 $('#quick-cart').addClass('in');
					   },
						});
						
											
					}
				},
			});
		}
	});
	
	$(".btn-continue-guest").click(function(){
		var email = checkoutUserEmail.val();
		if (email == "") {
			checkoutUserEmail.focus();
			
			$('#ErrorMsg').text('Please enter email address');
			return false;
		} else {
			
			if (validateEmail(email)) {
				$('#user_email').val(email);				
			} else { 
				checkoutUserEmail.focus();
				
				$('#ErrorMsg').text('Please enter valid email address');
				return false;
			}
		}
	});
	
	$(".update_qty_image").click(function(){
		
	});	
	
	$("#createAccountRadio").click(function(){
		$('#registrationForm').show();
	});
	$("#checkoutGuestRadio").click(function(){
		$('#registrationForm').hide();
	});
	$("#same_billing_info").change(function(){
		
		if (this.checked) {
			//$('#shippingDetails').css('display','none');
			//shippingDetails.hide();
			$("shippingDetails").addClass('has-error');
			var fname     = $('#billing_first_name').val();
			//var lname     = $('#billing_last_name').val();
			var bemail    = $('#billing_email').val();
			var telephone = $('#billing_telephone').val();
			var addr1     = $('#billing_address_1').val();
			var addr2     = $('#billing_address_2').val();
			var city      = $('#billing_city').val();
			var zip       = $('#billing_zip').val();
			//var state     = $('#billing_state').val();
			var country   = $('#billing_country').val();
			
			$('#shipping_first_name').val(fname);
			//$('#shipping_last_name').val(lname);
			$('#shipping_email').val(bemail);
			$('#shipping_telephone').val(telephone);
			$('#shipping_address_1').val(addr1);
			$('#shipping_address_2').val(addr2);
			$('#shipping_city').val(city);
			$('#shipping_zip').val(zip);
			//$('#shipping_state').val(state);
			$('#shipping_country').val(country);
			//$('#product_information').css('margin-top','55px');
			$('#shippingDetails').css('display','none');
			
		} else {
			$('#shippingDetails').css('display','none');
			//shippingDetails.show();
			//$('#product_information').css('margin-top','20px');
		}
		
	});
	$("#diff_billing_info").change(function(){
		if (this.checked) {
			$('#shippingDetails').css('display','block');
			$('#shipping_first_name').val('');
			$('#shipping_email').val('');
			$('#shipping_telephone').val('');
			$('#shipping_address_1').val('');
			$('#shipping_address_2').val('');
			$('#shipping_city').val('');
			$('#shipping_zip').val('');
			$('#shipping_country').val('');			
		}
	
	});
	$('form#creditCardInfo').validate({
		rules: {
			cc_name_on_card: {required: true},
			cc_expiration: {required: true},
			cc_card_number: {required: true},
			cc_varification_number: {required: true}
		},
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
	});
	
	$('form#ca-register').validate({
		rules: {
			firstName: {required: true},
			lastName: {required: true},
			email: {required: true,email: true},
			password: {minlength: 6, required: true}
		},
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
			console.log("inside form validation");
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
						console.log("inside form validation");

        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
	});
	
	$('form#checkout-new-user-reg').validate({
		rules: {
			registerFirstName: {required: true},
			registerLastName: {required: true},
			registerEmail: {required: true,email: true},
			registerPassword: {minlength: 6, required: true}
		},
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
		
	});
	
	$('form#checkout-login').validate({
		rules: {
			loginUserName: {required: true, email: true},
			loginPassword: {required: true},
		},
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
		
	});
	
	$('form#ca-login').validate({
		rules: {
			emailAddress: {required: true, email: true},
			password: {required: true}
		},
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
		
	});
	
	$('form#loginForm').validate({
		rules: {
			emailAddress: {required: true, email: true},
			password: {required: true}
		},
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        },
      
	});
	
	
	$('form#checkout-page-info').validate({
        rules: {
            billing_first_name: {
                required: true
            },
            billing_last_name: {
                required: true
            },
            billing_email: {
				required: true,
				email: true
			},
			billing_telephone: {
				minlength: 5,
				required: true
			},
			billing_address_1: {
				minlength: 5,
				required: true
			},
			billing_address_2: {
				minlength: 2,
				required: true
			},
			billing_city: {
				required: true
			},
			billing_zip: {
				required: true
			},
			billing_state: {
				required: true
			},
			billing_country: {
				required: true
			},			
			shipping_first_name: {
				required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				}
			},
			shipping_last_name: {
                required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				}
            },
            shipping_email: {
				required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				},
				email: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				}
			},
			shipping_telephone: {
				required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				}
			},
			shipping_address_1: {
				required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				}
			},
			shipping_address_2: {
				required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				}
			},
			shipping_city: {
				required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				}
			},
			shipping_zip: {
				required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				}
			},
			shipping_state: {
				required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				}
			},
			shipping_country: {
				required: function (element) {
					if($("#same_billing_info").is(':checked')) {
						return false;
					} else {
						return true;
					}
				}
			},
						
        },
        highlight: function(element) {
            $(element).closest('.form-group').addClass('has-error');
        },
        unhighlight: function(element) {
            $(element).closest('.form-group').removeClass('has-error');
        },
        errorElement: 'span',
        errorClass: 'help-block',
        errorPlacement: function(error, element) {
            if(element.parent('.input-group').length) {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element);
            }
        }
    });
    
    $('.newArrivalSorting').click(function () {
		$("#sortByNewArrival").submit();
	});	

	$(".addDist").change(function(){
	cpCode = $('#couponcode').val();
	if($('#couponcode').val() == "") cpCode = "n";
	var dataString = 'chkvalidcoupon/'+cpCode;
	cart = $(this).data('val');
	
	$.post( url+dataString, {
		
	}, function (response) {
		
		if(response == "error") {
			$("#div_invalid").html("Please Enter Valid Coupon Code");
		}
		else {
			discount = response;
			$.post( url+'addDist/'+discount+'/'+cart, {
				
			}, function (response) {
				$('p').show();
				var json = JSON.parse(response);
				$('#couponDist').html(" Rs."+json.discount);
				$('#grandtot').html(" Rs."+json.amount);
			});
		}
		
		});
	});
	
});

function editProductQty(cpID,cID) {
	
	$('#update_'+cID+'_'+cpID).show();
	$('#default_'+cID+'_'+cpID).hide();
	
	$('#update_icon_'+cID+'_'+cpID).css({'float': 'left','margin-right': '5px'});
	$('#update_icon_'+cID+'_'+cpID).show();
	$('#edit_icon_'+cID+'_'+cpID).hide();	
	
}

function updateProductQty(cpID,cID,route) {
	
	var qtyToUpdate = $('#qty_'+cID+'_'+cpID).val();
	
	var couponCode = "n";
	if($("#couponcode").length > 0 && $("#couponcode").val() !="") {
		var couponCode = $("#couponcode").val();
	}
	if (qtyToUpdate > 0) {	
		var attr1 = $('#qty_'+cID+'_'+cpID).data('attr1');
		var attr2 = $('#qty_'+cID+'_'+cpID).data('attr2');
		var attr3 = $('#qty_'+cID+'_'+cpID).data('attr3');
		var dataString = 'updateCartProduct/'+cpID+'/'+cID+'/'+qtyToUpdate+'/'+attr1+'/'+attr2+'/'+attr3+'/'+route+'/'+couponCode;
		//window.location = url+dataString;
		$.post( url+dataString, {
			
		}, function (response) {
			
			if(response == 0) {
				$('#qtyerror_'+cID+'_'+cpID).text(qtyToUpdate +" Products are not in stock");
			}
			else {
				$('#cartDel').html(response);
			}
		});
	} else {
		$('#ErrorMsg').show();
		$('#ErrorMsg').text('Please enter valid quantity');
		return false;
	}
}

function validateEmail(email) {
	var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	return expr.test(email);
}


function emptyCart(CartID) {
	
	var dataString = 'deleteCart/'+CartID;

	$.post( url+dataString, {
		
	}, function (response) {
		window.location = "/cart";
	});
}

function deleteCartProduct(CartItemID,CartID,route) {
	var couponCode = "n";
	if($("#couponcode").length > 0 && $("#couponcode").val() !="") {
		var couponCode = $("#couponcode").val();
	}
	var dataString = 'deleteCartProduct/'+CartItemID+'/'+CartID+'/'+route+'/'+couponCode;
	
	$.post( url+dataString, {
		
	}, function (response) {
		alert(response.indexOf('###'));
		if(response.indexOf('###') >= 0)
		{
				$('#cartDel').html('<div class="shoping_bag1">Sorry, you have not added any product in cart yet!</div>');
				$('#continuechk').hide();
				$('#totalp').hide();
		}
		else {
				$('#cartDel').html(response);
			
		}
	});
}

function changeC(id) {
	$('#'+id).css('background','#ffcc33');
}

function changeD(id) {
	$('#'+id).css('background','#00405d');
}

function removeFromWlist(wsID) {
	var dataString = 'deleteWlistProduct/'+wsID;
	$.post( url+dataString, {
		
	}, function (response) {
			
			window.location = "/dashboard/wishlist";
			$("#ErrorWishlist").show().delay( 60000 ).hide( 0 );
	});
}

$("#showmore").click(function(){
	var loaded= $(this).data('attr');
	var from = loaded;
	var to = loaded+8;
	alert(loaded);
	var dataString = 'showproduct/'+from+'/'+to;
	
	$.post( url+dataString, {
		
	}, function (response) {
	});
});	

$("#searchproduct").click(function(){
	var searchname   = $('#search').val();
	var dataString = 'searchProduct/'+searchname;
	window.location = url+dataString;	
});




		
