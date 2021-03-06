import React, {Component} from 'react';
import exercisesArray from '../utils/Exercises';
import {toMinutes, minutesTohhMM} from '../utils/Time';
import Typed from 'react-typed';
import TimeField from 'react-simple-timefield';

export default class ExercisesTime extends Component {
    constructor() {
        super();
        this.state = {
            tip: false,
            isFreeTimeInputVisible: false,
            freeTime: '00:00',
            freeTimeValidationMessage: []
        }
    }

    showFreeTimeInput = () => {
        if(this.freeTimeInput){
            this.setState({isFreeTimeInputVisible: true})
            this.freeTimeInput.focus()
        }
    }

    getResult(){
        var asMinutes = toMinutes(this.state.freeTime);
        var exerciseReturn = ['According to my math, you can '];
        var exercises = exercisesArray;
        exercises.long.sort(() => (0.5 - Math.random()));
        exercises.medium.sort(() => (0.5 - Math.random()));
        exercises.short.sort(() => (0.5 - Math.random()));
        while(asMinutes >= 60 && exercises.long.length > 0){
            exerciseReturn.push(`${exercises.long.pop()} for an hour`);
            asMinutes-=60;
        }
        while(asMinutes >= 30 && exercises.medium.length > 0){
            exerciseReturn.push(`${exercises.medium.pop()} for 30 minutes`);
            asMinutes-=30;
        }
        while(asMinutes >= 10 && exercises.short.length > 0){
            exerciseReturn.push(`${exercises.short.pop()} for 10 minutes`);
            asMinutes-=10;
        }
        exerciseReturn = exerciseReturn.map((exercise,index) => (index > 0 && index < exerciseReturn.length-1) ? (index < exerciseReturn.length-2) ? `${exercise}, ` : `${exercise} e `: exercise);
        exerciseReturn = exerciseReturn.join('');
        if(asMinutes > 0) exerciseReturn += ` and you still have ${minutesTohhMM(asMinutes)}.`;
        this.setState({result:exerciseReturn});
    }

    renderResults(){
        const result = this.state.result;
        if(result){
            return (
            <h3>
                <Typed typeSpeed={30}
                typedRef={(resultText) => { this.resultText = resultText }}
                showCursor={true}
                strings={[result]}
                />
            </h3>);
        }
    }


    freeTimeInputHandler = (value) => this.setState({freeTime: value});

    handleKeyPress = (e) => {
        var {tapped} = this.state;
        const eventType = e.type;
        const eventKey = e.key;
        if (eventType === 'touchend') {
            e.preventDefault();
            if (!tapped) {
                this.setState({tapped: setTimeout(() => {
                        this.setState({tapped: null});
                    }, 200)});
            } else {
                clearTimeout(tapped);
                this.setState({tapped: null});
                this.validateFreeTime(e.target.value);
            }
        } else if (eventKey === 'Enter') {
            e.preventDefault();
            this.validateFreeTime(e.target.value);
        };
    }

    componentWillUnmount = () => this.setState({tapped: null});

    validateFreeTime = (value) => {
        if (toMinutes(value) < 10) {
            this
                .freeTimeValidationField
                .start();
            this.setState({freeTimeValidationMessage: ['You need at least 10 minutes to exercise!']});
        } else {
            this.freeTimeInput.readOnly = true;
            this.freeTimeValidationField.className = "invisible";
            if(toMinutes(value) >= 1080)
                this.easterEgg.start();
            else this.finalText.start();
        }
    }

    render() {
        return (
            <div
                className={`text-container`}
                tabIndex="0">
                <div
                    className={this.state.result
                    ? 'invisible'
                    : ''}>
                    <h1><Typed
                        showCursor={false}
                        typedRef={(title) => {
                this.title = title
            }}
                        onComplete={() => {
                this
                    .description
                    .start()
            }}
                        typeSpeed={30}
                        strings={['I want to exercise in my spare time!']}/></h1>
                    <h3><Typed
                        stopped={true}
                        onComplete={() => {
                this
                    .inputFreeTimeType
                    .start()
            }}
                        showCursor={false}
                        typedRef={(description) => {
                this.description = description
            }}
                        typeSpeed={30}
                        strings={['Exercises are really important for a good quality of life, avoiding diseases, losing weight and much more.']}/></h3>
                    <h3><Typed
                        stopped={true}
                        onComplete={() => {this.showFreeTimeInput()}}
                        showCursor={false}
                        typedRef={(inputFreeTimeType) => {
                this.inputFreeTimeType = inputFreeTimeType
            }}
                        typeSpeed={30}
                        strings={['Type how much time you want to exercise on your spare time daily(<b>&lt;ENTER&gt;</b> or <b>&lt;DOUBLE_TAP&gt;</b> on the purple text to confirm): ']}/>
                        <TimeField
                            onKeyDown={this.handleKeyPress}
                            tabIndex="0"
                            onTouchEnd={this.handleKeyPress}
                            style={{
                            display: 'inline',
                            width: '100px'
                        }}
                            input={< input ref = {
                            (input) => {
                                this.freeTimeInput = input
                            }
                        } />}
                            onChange={this.freeTimeInputHandler}
                            value={this.state.freeTime}
                            className={`birthday-input ${this.state.isFreeTimeInputVisible
                            ? ''
                            : 'invisible'}`}
                            required="required"/>
                    </h3>
                    <Typed
                        className="validation-message"
                        typeSpeed={30}
                        tabIndex="0"
                        style={{
                        color: 'red'
                    }}
                        typedRef={(freeTimeValidationField) => {
                        this.freeTimeValidationField = freeTimeValidationField
                    }}
                        showCursor={false}
                        strings={this.state.freeTimeValidationMessage}
                        stopped={true}/>
                    <p>
                        <Typed
                            typeSpeed={30}
                            startDelay={50}
                            typedRef={(easterEgg) => {
                            this.easterEgg = easterEgg
                        }}
                            showCursor={false}
                            onComplete={() => {
                            this
                                .finalText
                                .start()
                        }}
                            strings={['Wow! That much? Maybe you could sleep a little bit...']}
                            stopped={true}/>
                    </p>
                    <p>
                        <Typed
                            typeSpeed={30}
                            startDelay={50}
                            typedRef={(finalText) => {
                            this.finalText = finalText
                        }}
                            showCursor={false}
                            onComplete={() => {
                            this
                                .dots
                                .start()
                        }}
                            strings={['Calculating results']}
                            stopped={true}/>
                        <Typed
                            typeSpeed={500}
                            typedRef={(dots) => {
                            this.dots = dots
                        }}
                            showCursor={false}
                            onComplete={() => {
                            this
                                .ready
                                .start()
                        }}
                            strings={['.....']}
                            stopped={true}/>
                        <Typed
                            typeSpeed={30}
                            typedRef={(ready) => {
                            this.ready = ready
                        }}
                            showCursor={false}
                            strings={['READY!']}
                            stopped={true}
                            onComplete={() => {
                            this.getResult()
                        }}/>
                    </p>
                </div>
                {this.renderResults()}
            </div>
        )
    }
}
