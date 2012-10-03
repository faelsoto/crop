$ ->
  $('.to-crop').crop
    align: 'middle'

$.fn.crop = ->
  $("<style>", { class: 'css-crop' }).text(estilos).appendTo "head" unless $("style.css-crop").size()

  $(this).each (el) ->
    pos = []
    $img = $(this)
    $img.wrap '<div class="crop">'
    $crop = $img.closest ".crop"
    $crop.data('crop-orig-img', $img)
    $img.clone().attr('class', 'crop-mask').appendTo $crop
    $img.hide()
    $overlay = $("<div class='crop-overlay'/>").appendTo $crop
    $rect = $("<div class='crop-rect'/>").appendTo $crop
    $rect_inner = $("<div class='crop-rect-inner'/>").appendTo $rect
    $("<div class='crop-rect-inner-sq sq-#{i}'/>").appendTo $rect_inner for i in [1..8]

    $rect_inner.on 'mousedown', (e) ->
      pos = [parseInt($rect.css('left'), 10), parseInt($rect.css('top'), 10)]
      mouse_pos = [e.clientX, e.clientY]
      $("html").on 'mousemove.crop', (e) ->
        $rect.css
          left: pos[0] + e.clientX-mouse_pos[0]
          top: pos[1] + e.clientY-mouse_pos[1]
        
    $("html").on 'mouseup mouseleave', ->
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
