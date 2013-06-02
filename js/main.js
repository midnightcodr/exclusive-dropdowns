( function() {
	window.App={
		Models: {},
		Views: {},
		Collections: {}
	};
	window.template=function(id) {
		return doT.template( $('#'+id).html() );
	}
	var vent=_.extend({}, Backbone.Events);
	var qs=[
		{qid: '1', question: 'question 1'},
		{qid: '2', question: 'question 2'},
		{qid: '3', question: 'question 3'},
		{qid: '4', question: 'question 4'},
		{qid: '5', question: 'question 5'}
	];

	App.Models.Question=Backbone.Model.extend({
		defaults: {
			qid:'',
			question:'',
			answer:''
		}
	});
	App.Collections.Questions=Backbone.Collection.extend({
		model: App.Models.Question,
		initialize: function(models, options) {
			options||(options={});
			this.selected=options.title||'';
		},
		comparator: function(q) {
			return q.get('qid');
		}
	});

	App.Views.Question=Backbone.View.extend({
		tagName: 'option',
		template: doT.template('{{! it.question }}'),
		render: function() {
			this.$el.html( this.template( this.model.toJSON() ) ).val( this.model.get('qid') );
			return this;
		}
	});
	App.Views.QuestionsCollection=Backbone.View.extend({
		tagName:'select',
		events: {
			'change': 'changeSelect',
		},
		initialize: function() {
			this.collection.on('add', this.addOne, this);
			this.collection.on('sort', this.render, this);
		},
		render: function() {
			this.$el.html('<option value="">Please choose one of the questions</option>');
			this.collection.each( this.addOne, this);
			this.$el.val( this.collection.selected );
			return this;
		},
		addOne: function(question) {
			var questionview=new App.Views.Question({model: question});
			this.$el.append(questionview.render().el);
		},
		changeSelect: function(e) {
			var qid=this.$el.val();
			this.collection.selected=qid;
			// collect all selected items
			var arr=[];
			if(qid!=='') {
				arr.push(qid);
			}
			_.each(this.options.othercollections, function(o, i) {
				if(o.selected!=='') {
					arr.push(o.selected);
				}	
			});
			_.each(this.options.othercollections, function(o, i) {
				var to_remove=_.difference(arr, (o.selected===''?[] : [o.selected]));
				o.set( _.filter(qs, function(el) { return to_remove.indexOf(el.qid)===-1; }) );
			});
		}
	});

	var questions1=new App.Collections.Questions(qs);
	var questions2=new App.Collections.Questions(qs);
	var questions3=new App.Collections.Questions(qs);
	var qv1=new App.Views.QuestionsCollection({collection: questions1, othercollections:[questions2, questions3]});
	var qv2=new App.Views.QuestionsCollection({collection: questions2, othercollections:[questions1, questions3]});
	var qv3=new App.Views.QuestionsCollection({collection: questions3, othercollections:[questions1, questions2]});
	$('#dd-wr1').html(qv1.render().el);
	$('#dd-wr2').html(qv2.render().el);
	$('#dd-wr3').html(qv3.render().el);
} )();
