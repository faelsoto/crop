$ ->
  $('.to-crop').crop
    align: 'middle'

$.fn.crop = ->
  $("<style>", { class: 'css-crop' }).text(estilos).appendTo "head" unless $("style.css-crop").size()

  $(this).each (el) ->
    $img = $(this)
    $img.wrap '<div class="crop">'
    $crop = $img.closest ".crop"
    $crop.data('crop-orig-img', $img)


estilos = """
.crop{ border: 10px solid; }
"""
