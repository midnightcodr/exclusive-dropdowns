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

	App.Models.Question=Backbone.Model.extend({
		defaults: {
			qid:'',
			question:'',
			answer:''
		}
	});
	App.Collections.Questions=Backbone.Collection.extend({
		model: App.Models.Question,
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
			this.options.selected=this.options.selected||'';
		},
		render: function() {
			this.$el.html('<option value="">Please choose one of the questions</option>');
			this.collection.each( this.addOne, this);
			this.$el.val( this.options.selected );
			return this;
		},
		addOne: function(question) {
			var questionview=new App.Views.Question({model: question});
			this.$el.append(questionview.render().el);
		},
		changeSelect: function(e) {
			var qid=this.$el.val();
			this.options.selected=qid;
			if(qid==='') { return; }
			var question=this.collection.findWhere({qid: qid});
			/*this.options.othercollections.each( function(o) {
				return;	
			});*/
			console.log('todo: handle othercollections');
		}
	});

	window.questions=new App.Collections.Questions([{qid:'5', question: 'question 5'}, {qid: '1', question: 'question 1'}, {qid: '3', question: 'question 3'}])
	window.qv1=new App.Views.QuestionsCollection({collection: questions});
	window.qv2=new App.Views.QuestionsCollection({collection: questions});
	$('#dd-wr1').html(qv1.render().el);
	$('#dd-wr2').html(qv2.render().el);
	// questions.add({qid:'0', question: 'question 0'})
} )();
