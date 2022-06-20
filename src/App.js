import React from 'react';



class App extends React.Component {
    state = {
        hour: 0,
        minute: 0,
        second: 0,
        btnDisabled: false,
        interval: "",
        intervalsStorage: [],

    }
    startClicked = () => {
        this.setState({
            btnDisabled: true
        })
       let timer = setInterval(() => {
        const { hour, minute, second } = this.state;
        if (second === 59) {
            if (minute === 59) {
                this.setState({
                    second: 0,
                    minute: 0,
                    hour: hour + 1
                });
            } else {
                this.setState({
                    second: 0,
                    minute: minute + 1,
                });
            }
            
        } else {
            this.setState({
                second: second + 1
            })
        }

       }, 1000);
       this.setState({
        interval: timer
       })
    }

    stopClicked = () => {
        clearInterval(this.state.interval);
        this.setState({
            btnDisabled: false
        })
    }

    intervalClicked = () => {
        const {hour, minute, second, intervalsStorage } = this.state;
        intervalsStorage.push(`${hour}:${minute}:${second}`);
        this.setState({
            intervalsStorage: intervalsStorage
        })
    }

    clearClicked = () => {
        const { interval,  } = this.state;
        this.stopClicked();
        this.setState({
            hour: 0,
            minute: 0,
            second: 0,
            btnDisabled: false,
            intervalsStorage: []
        })
        clearInterval(interval)
    }

    render () {
        const { hour, minute, second, btnDisabled, intervalsStorage } = this.state;
        return (
            <div className="app">
                <div className="timer-container">
                    <h1 className='mb-4'>
                        <span>Online</span> StopWatch
                    </h1>
                    <div className="timer-col">
                        <p className="timer-hours">
                            {hour}
                        </p>
                        <p className="timer-label">
                            Hours
                        </p>
                    </div>

                    <div className="timer-col">
                        <p className="timer-minutes">
                            {minute}
                        </p>
                        <p className="timer-label">
                            Minutes
                        </p>
                    </div>

                    <div className="timer-col">
                        <p className="timer-seconds">
                            {second}
                        </p>
                        <p className="timer-label">
                            Seconds
                        </p>
                    </div>
                </div>

                <div className="timer-container text-center">
                    <div className="timer-btn">
                        <button 
                            onClick={this.startClicked} 
                            className="btn btn-success"
                            disabled={btnDisabled}
                        >
                            Start
                        </button>
                    </div>

                    <div className="timer-btn">
                        <button 
                            className="btn btn-danger"
                            onClick={this.stopClicked}
                            
                        >
                            Stop
                        </button>
                    </div>

                    <div className="timer-btn">
                        <button 
                            className="btn btn-secondary"
                            onClick={this.intervalClicked}
                            disabled={!btnDisabled}
                        >
                            Interval
                        </button>
                    </div>

                    <div className="timer-btn">
                        <button 
                            className="btn btn-warning"
                            onClick={this.clearClicked}
                        >
                            Clear
                        </button>
                    </div>
                </div>

                <div className="timer-container-intervals text-center">
                    {intervalsStorage.map((item, index) => <p>{index + 1} =&gt; {item}</p>)}
                </div>
            </div>
        )
    }
}

export default App;