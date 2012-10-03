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
      var $crop, $img, $overlay, $rect, $rect_inner, i, _i, _results;
      $img = $(this);
      $img.wrap('<div class="crop">');
      $crop = $img.closest(".crop");
      $crop.data('crop-orig-img', $img);
      $img.clone().attr('class', 'crop-mask').appendTo($crop);
      $img.hide();
      $overlay = $("<div class='crop-overlay'/>").appendTo($crop);
      $rect = $("<div class='crop-rect'/>").appendTo($crop);
      $rect_inner = $("<div class='crop-rect-inner'/>").appendTo($rect);
      _results = [];
      for (i = _i = 1; _i <= 8; i = ++_i) {
        _results.push($("<div class='crop-rect-inner-sq sq-" + i + "'/>").appendTo($rect_inner));
      }
      return _results;
    });
  };

  estilos = ".crop{\n  position: relative;\n}\n.crop-overlay{\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(255, 255, 255, 0.5);\n}\n.crop-rect{\n  position: absolute;\n  top: 0;\n  left: 0;\n  border: 1px solid;\n}\n.crop-rect-inner{\n  position: relative;\n  width: 100px;\n  height: 100px;\n}\n.crop-rect-inner-sq{\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  background: rgba(0, 0, 0, 0.5);\n  cursor: pointer;\n}\n.crop-rect-inner-sq.sq-1, .crop-rect-inner-sq.sq-2, .crop-rect-inner-sq.sq-3{\n  top: -5px;\n}\n.crop-rect-inner-sq.sq-1, .crop-rect-inner-sq.sq-4, .crop-rect-inner-sq.sq-6{\n  left: -5px;\n}\n.crop-rect-inner-sq.sq-3, .crop-rect-inner-sq.sq-5, .crop-rect-inner-sq.sq-8{\n  right: -5px;\n}\n.crop-rect-inner-sq.sq-6, .crop-rect-inner-sq.sq-7, .crop-rect-inner-sq.sq-8{\n  bottom: -5px;\n}\n.crop-rect-inner-sq.sq-2, .crop-rect-inner-sq.sq-7{\n  margin-left: -5px;\n  left: 50%;\n}\n.crop-rect-inner-sq.sq-4, .crop-rect-inner-sq.sq-5{\n  margin-top: -5px;\n  top: 50%;\n}\n";

}).call(this);
