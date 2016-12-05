jQuery ->
  class Item extends Backbone.Model
    defaults:
      part1: 'Hello'
      part2: 'Backbone'

  class List extends Backbone.Collection
    model: Item

  class ItemView extends Backbone.View
    tagName: 'li',

    initialize: ->
      _.bindAll @

    render: ->
      $(@el).html "<span>#{@model.get 'part1'} #{@model.get 'part2'}!</span>"
      @

  class ListView extends Backbone.View
    el: $ 'body'

    initialize: ->
      _.bindAll @

      @collection = new List
      @collection.bind 'add', @appendItem

      @counter = 0
      @render()

    render: ->
      console.log('render for listview called');
      $(@el).append '<button>Add List Item</button>'
      $(@el).append '<ul></ul>'

    addItem: ->
      console.log('add item called');
      @counter++
      item = new Item
      item.set part2: (item.get('part2')) + " " + this.counter
      @collection.add item

    appendItem: (item) ->
      console.log('append item called');
      item_view = new ItemView model: item
      $('ul').append item_view.render().el

    events: 'click button': 'addItem'

  list_view = new ListView
