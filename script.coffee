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
      console.log("itemview init called");
      _.bindAll @
      @model.bind 'change', @render
      @model.bind 'remove', @unrender

    render: =>
      console.log("render item view called");
      console.log("model: ", @model);
      $(@el).html "<span>#{@model.get 'part1'} #{@model.get 'part2'}!</span>
        <span class='swap'>swap</span>
        <span class='delete'>delete</span>
        "
      @

    unrender: =>
      $(@el).remove()

    remove: ->
      @model.destroy()

    swapParts: ->
      console.log("swap parts called");
      @model.set
        part1: @model.get 'part2'
        part2: @model.get 'part1'

    events:
      'click .swap': 'swapParts'
      'click .delete': 'remove'

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

  Backbone.sync = (method, model, success, error) ->
    success()
  list_view = new ListView
