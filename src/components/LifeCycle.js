import React from 'react'

export default class LifeCycle extends React.Component {
    constructor(){
        super();
        this.name = "Ashok";
        this.password = "****";

        //this.count=0;
        this.state = {
            count: 0,
          };
        console.log('constructor calling...')
    }

    componentDidMount(){

        console.log('component did mount calling...')
    }

    componentDidUpdate(){
        console.log("did update")
    }

    shouldComponentUpdate(nextProps, nextState){

        // if(this.state.count < 5)
        // return false;
        // else 
        return true;

    }

    increment = () => {
        this.setState({ count: this.state.count + 1 })
       // console.log("increment")
    }
    decrement = () => {
        this.setState({ count: this.state.count - 1 })
       // console.log("decrement");
    }

    render(){
        console.log("render method is calling");
        return(
            <div>
                <h1>Login Page</h1>
                <h3>{this.name + " " + this.password}</h3>
                
                <button onClick={this.increment}>Increment button</button>
                <br></br><br></br>
                <button onClick={this.decrement}>Decrement button</button>
                
                <h2>count = {this.state.count}</h2>
            </div>
        )
    }
}
