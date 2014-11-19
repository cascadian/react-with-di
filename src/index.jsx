
var di = require('di');

var i = 0;

var HTTP = function(){
    return function(){
        this.i = i++;
    }
}

di.annotate(HTTP, new di.Provide(HTTP));

var MyComponentViewModel = function($HTTP){
    return function(){
        this.http = new $HTTP();
    }
}

di.annotate(MyComponentViewModel, new di.Provide(MyComponentViewModel));
di.annotate(MyComponentViewModel, new di.Inject(HTTP));


var ChildComponent = function($ViewModel){
    return React.createClass({
        render: function() {
            this.viewModel = this.viewModel || new $ViewModel();
            return (
                <div>Child {this.viewModel.http.i}</div>
            );
        }
    });
}

di.annotate(ChildComponent, new di.Provide(ChildComponent));
di.annotate(ChildComponent, new di.Inject(MyComponentViewModel));


var RootComponent = function(Child){
    return React.createClass({
        render: function(){
            return (
                <div>
                    <Child />
                    <Child />
                </div>
            );
        }
    })
}

di.annotate(RootComponent, new di.Provide(RootComponent));
di.annotate(RootComponent, new di.Inject(ChildComponent));

var injector = new di.Injector();

var Root = injector.get(RootComponent);

React.render(<Root/>, document.getElementById('content'));
