import React, { Component } from 'react';
import { Text, View, StyleSheet,  Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import Svg,{Image,Circle,ClipPath} from 'react-native-svg'
import * as firebase from 'firebase'
const {width, height} = Dimensions.get('window');


//extract value from animated
const {Value, 
        event, 
        block, 
        cond, 
        eq, 
        set, 
        Clock, 
        startClock, 
        stopClock, 
        debug, 
        timing, 
        clockRunning,
         interpolate, 
         Extrapolate,
        concat} = Animated

// Timing
function runTiming(clock, value, dest) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };
    const config = {
        duration: 1000,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease),
    };
    return block([
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        timing(clock, state, config),
        cond(state.finished, debug('stop clock', stopClock(clock))),
        state.position,
    ]);
}

 class RegisterScreen extends Component {

    state = {
        name: "",
        email: "",
        password: "",
        errorMessage: null

     }

     handleSignUp = () => {
         firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.name
                })
            })
            .catch(error => this.setState({errorMessage: error.message}))

     }



    constructor() {
        super()
        //Set up a new animated value
        this.buttonOpacity = new Value(1)
        //get the latest state of the handler
        this.onStateChange = event([
            {
                nativeEvent:({ state }) => block([
                    
                        // chect state here befor run ani
                        cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 1, 0)))
                    
                ])
            }
        ])
        this.onCloseState =  event([
            {
                nativeEvent:({ state }) => block([
                    
                        // chect state here befor run ani
                        cond(eq(state, State.END), set(this.buttonOpacity, runTiming(new Clock(), 0, 1)))
                    
                ])
            }
        ])



        //Setup the other animations
        this.buttonY = interpolate(this.buttonOpacity,{
            inputRange: [0, 1],
            outputRange: [100, 0],
            //make sure the animation does not extrapolate itself
            extrapolate: Extrapolate.CLAMP
        });
        //animate bg upwards
        this.bgY = interpolate(this.buttonOpacity,{
            inputRange: [0, 1],
            outputRange: [-height / 3 -50, 0],
            extrapolate: Extrapolate.CLAMP
        });
        this.textInputZindex = interpolate(this.buttonOpacity,{
            inputRange: [0, 1],
            outputRange: [1, -1],
            extrapolate: Extrapolate.CLAMP
        });
        this.textInputY = interpolate(this.buttonOpacity,{
            inputRange: [0, 1],
            outputRange: [0, 100],
            extrapolate: Extrapolate.CLAMP
        });
        this.TextInputOpacity =  interpolate(this.buttonOpacity,{
            inputRange: [0, 1],
            outputRange: [1, 0],
            extrapolate: Extrapolate.CLAMP
        });
        this.rotateCross = interpolate(this.buttonOpacity,{
            inputRange: [0, 1],
            outputRange: [180, 360],
            extrapolate: Extrapolate.CLAMP
        });
        
    }

    
  render() {
    return (
<KeyboardAvoidingView style={{flex:1,backgroundColor:'white',justifyContent: 'flex-end'}} behavior="padding" enabled>

      <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'flex-end'}}>
          <Animated.View style={{...StyleSheet.absoluteFill, transform:[{translateY: this.bgY}]}}>

              <Svg height={height+50} width={width}>
                    <ClipPath id="clip">
                        <Circle r={height+50} cx={width / 2} />
                    </ClipPath>
              <Image
                href={require('../assets/Killing_Viruses_-_Finding_the_Cure_-_Coronavirus.jpg')}
                // style={{ flex: 1, height: null, width:null}}
                width={width}
                height={height+50}
                preserveAspectRatio="xMidyMid slice"
                clipPath='url(#clip)'
                />

              </Svg>

             

          </Animated.View>

          <View style={{height:height / 3, justifyContent: 'center'}}>
            <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                <Animated.View style={{...styles.button, opacity: this.buttonOpacity, transform:[{translateY: this.buttonY}]}}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold'}}>SIGN UP</Text>
                </Animated.View>
            </TapGestureHandler>
              

              <Animated.View style={{...styles.button, backgroundColor: '#2E71Dc', opacity:this.buttonOpacity, transform:[{translateY: this.buttonY}]}}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white'}}>SIGN IN WITH FACEBOOK</Text>
              </Animated.View>

              <Animated.View style={{zIndex:this.textInputZindex, opacity: this.TextInputOpacity, transform:[{translateY:this.textInputY}], height: height/3, ...StyleSheet.absoluteFill, top: null, justifyContent: 'center'}}>

                {/* <TapGestureHandler onHandlerStateChange={this.onCloseState}>
                    <Animated.View style={styles.closeButton}>
                        <Animated.Text style={{fontSize: 15, transform:[{rotate: concat(this.rotateCross, 'deg')}]}}>X</Animated.Text>
                    </Animated.View>

                </TapGestureHandler> */}

                    <TextInput 
                    placeholder="FULL NAME"
                    style={styles.textInput}
                    placeholderTextColor= "black" 
                    onChangeText={name => this.setState({ name})}
                    value={this.state.name}
                    />

                    <TextInput 
                    placeholder="EMAIL"
                    style={styles.textInput}
                    placeholderTextColor= "black"
                    onChangeText={email => this.setState({ email})}
                    value={this.state.email}

                    />  

                    <TextInput 
                    placeholder="PASSWORD"
                    style={styles.textInput}
                    placeholderTextColor= "black"
                    secureTextEntry={true} 
                    onChangeText={password => this.setState({ password})}
                    value={this.state.password}
                    />  


                     
                    <TouchableOpacity onPress={this.handleSignUp}>
                    <Animated.View style={styles.signUp}>
                        <Text style={{ fontSize:20, fontWeight:'bold'}}>SIGN UP</Text>
                         </Animated.View> 
                         </TouchableOpacity> 

                    {/* <Animated.View style={{ justifyContent:"center", alignItems: "center"}}>
                        <Text style={{ fontSize:12, fontWeight:'300'}}>Already Have An Account?</Text><TouchableOpacity onPress={this.props.navigation.navigate("Loginr")}><Text style={{color:'#2E71Dc', fontWeight: 'bold'}}>SIGN IN</Text></TouchableOpacity>
                        </Animated.View>                    */}

                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}> 

                    <Animated.View style={{ justifyContent:"center", alignItems: "center", paddingTop:20}}>
                    <Text style={{ fontSize:12, fontWeight:'300'}}>Already Have An Account?<Text style={{color:'#2E71Dc', fontWeight: '500'}}> SIGN IN</Text></Text>
                    </Animated.View>  

                    </TouchableOpacity>

               </Animated.View>    
            

          </View>
        
      </View>
      </KeyboardAvoidingView>
    );
    
  }
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: 'white',
        height: 70,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: {width:2, height: 2},
        shadowColor: 'black',
        shadowOpacity: 0.2
    },
    closeButton: {
        height: 40, width:40,
        backgroundColor:'white',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        top: -20,
        left:width/2 -20,
        shadowOffset: {width:2, height: 2},
        shadowColor: 'black',
        shadowOpacity: 0.2

    },
    textInput: {
        height: 40,
        borderRadius: 25,
        borderWidth: 0.5,
        marginHorizontal: 20, 
        paddingLeft:10,
        marginVertical: 5,
        borderColor: 'rgba(0,0,0,0.2)',
        backgroundColor: 'white'
    },
    signUp: {
        backgroundColor: 'white',
        height: 50,
        marginHorizontal: 20,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        shadowOffset: {width:2, height: 2},
        shadowColor: 'black',
        shadowOpacity: 0.2

    }
    
})
