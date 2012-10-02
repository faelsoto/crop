(function() {
  var estilos;

  $(function() {
    return $('.to-crop').crop({
      align: 'middle'
    });
  });

  $.fn.crop = function() {
    if (!$("style.css-crop").size()) {
      $("<style>", {
        "class": 'css-crop'
      }).text(estilos).appendTo("head");
    }
    return $(this).each(function(el) {
      var $crop, $img;
      $img = $(this);
      $img.wrap('<div class="crop">');
      $crop = $img.closest(".crop");
      return $crop.data('crop-orig-img', $img);
    });
  };

  estilos = ".crop{ border: 10px solid; }";

}).call(this);
