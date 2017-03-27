$(function() {
     var boardWidth = $('#kanban-board').width()
     var $columns = $('.sortable-wrapper')
     var columnCount = $columns.length
     var columnMargin = 10
     $columns.width(Math.floor((boardWidth - (columnMargin*(columnCount + 1))) / columnCount))
     $(".sortable").sortable({
         revert: true,
         placeholder: 'drag-place-holder',
         forcePlaceholderSize: true, 
         connectWith: ".sortable",
         helper:function(event, element){return $(element).clone().addClass('dragging')},
         start: function (e, ui) {ui.item.show().addClass('ghost')},
         stop: function (e, ui) { ui.item.show().removeClass('ghost')},      
         cursor:'move'
     })
     .disableSelection()

     $('#backlog').children().each(function () {
        $(this).children().val()
     })
});