f= (global, list) ->
	B=Backbone
	App=
		M: {}
		V: {}
		C: {}

	App.M.Item=B.Model.extend defaults: { itemid: '', label:'' }

	App.C.Items=B.Collection.extend
		model: App.M.Item
		,
		initialize: (models, options) ->
			options||(options={})
			@selected=options.title||''
		,
		comparator: (q) ->
			return q.get('itemid')

	App.V.Item=B.View.extend
		tagName: 'option'
		,
		template: (doT.template '{{! it.label }}')
		,
		render: ->
			@$el.html(@template(@model.toJSON())).val(@model.get('itemid'))
			@
		
	App.V.ItemsCollection=B.View.extend
		tagName: 'select'
		,
		events: { 'change': 'changeSelect' }
		,
		initialize: ->
			@collection.on 'add', @addOne, @
			@collection.on 'sort', @render, @
		,
		render: ->
			@$el.html '<option value="">Please choose one of the items</option>'
			@collection.each @addOne, @
			@$el.val @collection.selected
			@
		,
		addOne: (item) ->
			itemview=new App.V.Item model: item
			@$el.append itemview.render().el
		,
		changeSelect: (e) ->
			itemid=@$el.val()
			@collection.selected=itemid
			arr=[]
			arr.push itemid if itemid isnt ''
			_.each @options.othercollections, (o, i) ->
				arr.push o.selected if o.selected isnt ''

			_.each @options.othercollections, (o, i) ->
				to_remove=_.difference arr, (if o.selected is '' then [] else [o.selected])
				o.set _.filter( list, (el)-> to_remove.indexOf(el.itemid) is -1 )

		
	items1=new App.C.Items(list)
	items2=new App.C.Items(list)
	items3=new App.C.Items(list)

	itemsview1=new App.V.ItemsCollection collection: items1, othercollections: [items2, items3]
	itemsview2=new App.V.ItemsCollection collection: items2, othercollections: [items1, items3]
	itemsview3=new App.V.ItemsCollection collection: items3, othercollections: [items1, items2]

	$('#dd-wr1').html itemsview1.render().el
	$('#dd-wr2').html itemsview2.render().el
	$('#dd-wr3').html itemsview3.render().el

	global.App=App


qs=[
	{itemid: '1', label: 'demo question 1'}
	{itemid: '2', label: 'demo question 2'}
	{itemid: '3', label: 'demo question 3'}
	{itemid: '4', label: 'demo question 4'}
	{itemid: '5', label: 'demo question 5'}
]
f(window, qs)
