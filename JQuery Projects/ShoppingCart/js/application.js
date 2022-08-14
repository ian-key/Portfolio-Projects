var updateProductValue = function (ele) {
    var productCost = parseFloat($(ele).find('.price').text()) || 0;
    var productQuantity = parseFloat($(ele).find('.quantity input').val()) || 0;

    var totalCost = productCost * productQuantity;
    $(ele).children('.totalCost').html(totalCost.toFixed(2));

    return totalCost;
};

var sum = function (acc, x) { return acc + x; };

var updateBasketValue = function () {
  var productValues = [];

  $('tbody tr').each(function (i, ele) {
    var productValue = updateProductValue(ele);
    productValues.push(productValue);
  });

  var basketValue = productValues.reduce(sum);
  $('#basketValue').html(basketValue.toFixed(2));
}

$(document).ready(function () {
  updateBasketValue();

  $(document).on('click', '.btn.remove', function (event) {
    if ($('tbody tr').length === 1) {
      alert("You cannot leave your basket empty. Please add a product if you wish to remove this one.")
    } else {
    $(this).closest('tr').remove();
    updateBasketValue();}
  });


  var timeout;
  $(document).on('input', 'tr input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateBasketValue();
    }, 500);
  });

  $('#addProduct').on('submit', function (event) {
    event.preventDefault();
    var product = $(this).children('[name=product]').val();
    var price = parseFloat($(this).children('[name=price]').val()).toFixed(2);
    var quantity = $(this).children('[name=quantity]').val();
    
    $('tbody').append('<tr>' +
    '<td class="product">' + product + '</td>' +
    '<td class="price">' + price + '</td>' +
    '<td class="quantity"><input type="number" value="' + quantity + '" min="0" /></td>' +
    '<td class="totalCost"></td>' +
    '<td><button class="btn btn-light btn-sm remove">Remove</button></td>' +
    '</tr>');

    updateBasketValue();
    $(this).children('[name=product]').val('');
    $(this).children('[name=price]').val('');
    $(this).children('[name=quantity]').val('');
  })
});