$ ->
  $('.to-crop').crop
    align: 'middle'

$.fn.crop = ->
  $("<style>", { class: 'css-crop' }).text(estilos).appendTo "head" unless $("style.css-crop").size()

  $(this).each (el) ->
    pos = []
    $img_orig = $(this)
    $img_orig.wrap '<div class="crop">'
    $crop = $img_orig.closest ".crop"
    $crop.data('crop-orig-img', $img_orig)
    $img = $img_orig.clone().attr('class', 'crop-mask').appendTo $crop
    $img_orig.hide()
    $overlay = $("<div class='crop-overlay'/>").appendTo $crop
    $rect = $("<div class='crop-rect'/>").appendTo $crop
    $rect_inner = $("<div class='crop-rect-inner'/>").appendTo $rect
    $("<div class='crop-rect-inner-sq sq-#{i}'/>").appendTo $rect_inner for i in [1..8]

    # deshabilitamos drag & drop
    $crop.find("*").on "mousedown", (e) ->
      e.preventDefault()

    # mover handlers
    $rect_inner.find(".crop-rect-inner-sq").on 'mousedown', (e) ->
      e.stopPropagation()
      $handler = $(this)
      pos = [parseInt($rect.css('left'), 10), parseInt($rect.css('top'), 10)]
      mouse_pos = [e.clientX, e.clientY]
      w = $rect_inner.width()
      h = $rect_inner.height()
      $("html").on 'mousemove.crop', (e) ->
        css = {}
        css_inner = {}

        new_w = w + e.clientX-mouse_pos[0]
        new_h = h + e.clientY-mouse_pos[1]

        if new_w <= 0 && $handler.is(".sq-3, .sq-5, .sq-8")
          css.left = pos[0] - Math.abs new_w
          css_inner.width = Math.abs new_w
        else
          css_inner.width = new_w
          
        $rect_inner.css css_inner
        $rect.css css
      

    # mover rectángulo
    $rect_inner.on 'mousedown', (e) ->
      pos = [parseInt($rect.css('left'), 10), parseInt($rect.css('top'), 10)]
      mouse_pos = [e.clientX, e.clientY]
      $("html").on 'mousemove.crop', (e) ->
        $rect.css
          left: Math.min(Math.max(pos[0] + e.clientX-mouse_pos[0], 0), $img.width() - $rect.outerWidth())
          top: Math.min(Math.max(pos[1] + e.clientY-mouse_pos[1], 0), $img.height() - $rect.outerHeight())
        
    $("html").on 'mouseup', ->
      $(this).off 'mousemove.crop'

estilos = """
.crop{
  position: relative;
}
.crop-overlay{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.5);
}
.crop-rect{
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid;
}
.crop-rect-inner{
  position: relative;
  width: 100px;
  height: 100px;
  cursor: move;
}
.crop-rect-inner-sq{
  position: absolute;
  width: 10px;
  height: 10px;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
.crop-rect-inner-sq.sq-1, .crop-rect-inner-sq.sq-2, .crop-rect-inner-sq.sq-3{
  top: -5px;
}
.crop-rect-inner-sq.sq-1, .crop-rect-inner-sq.sq-4, .crop-rect-inner-sq.sq-6{
  left: -5px;
}
.crop-rect-inner-sq.sq-3, .crop-rect-inner-sq.sq-5, .crop-rect-inner-sq.sq-8{
  right: -5px;
}
.crop-rect-inner-sq.sq-6, .crop-rect-inner-sq.sq-7, .crop-rect-inner-sq.sq-8{
  bottom: -5px;
}
.crop-rect-inner-sq.sq-2, .crop-rect-inner-sq.sq-7{
  margin-left: -5px;
  left: 50%;
}
.crop-rect-inner-sq.sq-4, .crop-rect-inner-sq.sq-5{
  margin-top: -5px;
  top: 50%;
}

"""
