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
      var $crop, $img, $img_orig, $overlay, $rect, $rect_inner, i, pos, _i;
      pos = [];
      $img_orig = $(this);
      $img_orig.wrap('<div class="crop">');
      $crop = $img_orig.closest(".crop");
      $crop.data('crop-orig-img', $img_orig);
      $img = $img_orig.clone().attr('class', 'crop-mask').appendTo($crop);
      $img_orig.hide();
      $overlay = $("<div class='crop-overlay'/>").appendTo($crop);
      $rect = $("<div class='crop-rect'/>").appendTo($crop);
      $rect_inner = $("<div class='crop-rect-inner'/>").appendTo($rect);
      for (i = _i = 1; _i <= 8; i = ++_i) {
        $("<div class='crop-rect-inner-sq sq-" + i + "'/>").appendTo($rect_inner);
      }
      $crop.find("*").on("mousedown", function(e) {
        return e.preventDefault();
      });
      $rect_inner.find(".crop-rect-inner-sq").on('mousedown', function(e) {
        var $handler, h, mouse_pos, w;
        e.stopPropagation();
        $handler = $(this);
        pos = [parseInt($rect.css('left'), 10), parseInt($rect.css('top'), 10)];
        mouse_pos = [e.clientX, e.clientY];
        w = $rect_inner.width();
        h = $rect_inner.height();
        return $("html").on('mousemove.crop', function(e) {
          var css, css_inner, new_h, new_w, x_diff, y_diff;
          css = {};
          css_inner = {};
          new_w = w + e.clientX - mouse_pos[0];
          new_h = h + e.clientY - mouse_pos[1];
          if ($handler.is(".sq-1, .sq-4, .sq-6")) {
            x_diff = w - e.clientX + mouse_pos[0];
            if (x_diff > 0) {
              css.left = pos[0] + new_w - w;
              css_inner.width = w - e.clientX + mouse_pos[0];
            } else {
              css.left = pos[0] + w;
              css_inner.width = Math.abs(x_diff);
            }
          }
          if ($handler.is(".sq-3, .sq-5, .sq-8")) {
            if (new_w <= 0) {
              css.left = pos[0] - Math.abs(new_w);
              css_inner.width = Math.abs(new_w);
            } else {
              css_inner.width = new_w;
            }
          }
          if (css.left < 0) {
            css.left = 0;
            css_inner.width = $rect_inner.width();
          }
          if (pos[0] + css_inner.width >= $img.width()) {
            css_inner.width = $img.width() - pos[0] - 2;
          }
          if ($handler.is(".sq-1, .sq-2, .sq-3")) {
            y_diff = h - e.clientY + mouse_pos[1];
            if (y_diff > 0) {
              css.top = pos[1] + new_h - h;
              css_inner.height = h - e.clientY + mouse_pos[1];
            } else {
              css.top = pos[1] + w;
              css_inner.height = Math.abs(y_diff);
            }
          }
          if ($handler.is(".sq-6, .sq-7, .sq-8")) {
            if (new_h <= 0) {
              css.top = pos[1] - Math.abs(new_h);
              css_inner.height = Math.abs(new_h);
            } else {
              css_inner.height = new_h;
            }
          }
          if (css.top < 0) {
            css.top = 0;
            css_inner.height = $rect_inner.height();
          }
          if (pos[1] + css_inner.height >= $img.height()) {
            css_inner.height = $img.height() - pos[1] - 2;
          }
          $rect_inner.css(css_inner);
          return $rect.css(css);
        });
      });
      $rect_inner.on('mousedown', function(e) {
        var mouse_pos;
        pos = [parseInt($rect.css('left'), 10), parseInt($rect.css('top'), 10)];
        mouse_pos = [e.clientX, e.clientY];
        return $("html").on('mousemove.crop', function(e) {
          return $rect.css({
            left: Math.min(Math.max(pos[0] + e.clientX - mouse_pos[0], 0), $img.width() - $rect.outerWidth()),
            top: Math.min(Math.max(pos[1] + e.clientY - mouse_pos[1], 0), $img.height() - $rect.outerHeight())
          });
        });
      });
      return $("html").on('mouseup', function() {
        return $(this).off('mousemove.crop');
      });
    });
  };

  estilos = ".crop{\n  position: relative;\n}\n.crop-overlay{\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background: rgba(255, 255, 255, 0.5);\n}\n.crop-rect{\n  position: absolute;\n  top: 0;\n  left: 0;\n  border: 1px solid;\n}\n.crop-rect-inner{\n  position: relative;\n  width: 100px;\n  height: 100px;\n  cursor: move;\n}\n.crop-rect-inner-sq{\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  background: rgba(0, 0, 0, 0.5);\n  cursor: pointer;\n}\n.crop-rect-inner-sq.sq-1, .crop-rect-inner-sq.sq-2, .crop-rect-inner-sq.sq-3{\n  top: -5px;\n}\n.crop-rect-inner-sq.sq-1, .crop-rect-inner-sq.sq-4, .crop-rect-inner-sq.sq-6{\n  left: -5px;\n}\n.crop-rect-inner-sq.sq-3, .crop-rect-inner-sq.sq-5, .crop-rect-inner-sq.sq-8{\n  right: -5px;\n}\n.crop-rect-inner-sq.sq-6, .crop-rect-inner-sq.sq-7, .crop-rect-inner-sq.sq-8{\n  bottom: -5px;\n}\n.crop-rect-inner-sq.sq-2, .crop-rect-inner-sq.sq-7{\n  margin-left: -5px;\n  left: 50%;\n}\n.crop-rect-inner-sq.sq-4, .crop-rect-inner-sq.sq-5{\n  margin-top: -5px;\n  top: 50%;\n}\n";

}).call(this);
