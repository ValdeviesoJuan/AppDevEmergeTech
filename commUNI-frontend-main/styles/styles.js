import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -65 }, { translateY: -25 }],
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 8,
    zIndex: 1000, // Ensures the overlay is above other content
    alignItems: 'center', // Centers the text horizontally
    justifyContent: 'center', // Centers the text vertically
  },
  overlayText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gradientContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 27,
  },
  title: {
    fontSize: 31,
    fontFamily: "Poppins-Bold",
    marginBottom: 8,
    color: '#000',
  },
  subtitle: {
    fontSize: 17,
    fontFamily: "Inter-Regular",
    textAlign: 'center',
    color: '#666',
    marginBottom: 50,
  },
  starstar: {
    width: 10, // Adjust size to match the sparkle in the image
    height: 10,
    alignSelf: "flex-end",
    marginTop: 10,
    marginRight: 45,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 5,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    marginTop: 40,
    backgroundColor: '#000',
  },
  createButton: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    borderColor: '#000',
  },
  buttonPressed: {
    backgroundColor: '#2E7D32', // Color when pressed
  },
  buttonText: {
    fontFamily: "Inter-Semibold",
    fontSize: 15,
    color: '#FFF',
    // fontWeight: 'bold',
  },
  buttonTextDark: {
    fontFamily: "Inter-Semibold",
    fontSize: 15,
    color: '#000',
    // fontWeight: 'bold',
  },
  headerContainer: {
    flexDirection: 'row', // Place items horizontally
    alignItems: 'center', // Vertically align items to the center
    justifyContent: 'center', // Center everything horizontally
  },
  registerScreenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  registerContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  registerLogo: {
    fontFamily: "Poppins-Bold",
    fontSize: 28,
    // fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    color: '#000',
  },
  registerTabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: 2,
    marginBottom: 20,
  },
  registertabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  registeractiveTabButton: {
    borderBottomColor: '#000',
  },
  registertabText: {
    fontFamily: "Poppins-Semiold",
    fontSize: 16,
    color: '#aaa',
  },
  registeractiveTabText: {
    fontFamily: "Poppins-SemiBold",
    color: '#000',
    // fontWeight: 'bold',
  },
  registerinputContainer: {
    // fontFamily: "Inter-Regular",
    marginBottom: 15,
  },
  registerlabel: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  dpy: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  dpyinput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    // paddingHorizontal: 10,
    // paddingVertical: 1,
    fontSize: 10,
  },
  registerinput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
  },
  registersmallInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  registerrow: {
    flexDirection: 'row',
  },
  registertermsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  registertermsText: {
    marginLeft: 5,
    color: '#555',
  },
  registerbutton: {
    backgroundColor: '#000',
    borderRadius: 8,
    alignItems: 'center',
    paddingVertical: 12,
    marginVertical: 10,
  },
  registerbuttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orRegisterWithText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#555',
  },
  registersocialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 20,
  },
  registerfooterText: {
    textAlign: 'center',
    color: '#555',
    marginTop: 10,
  },
  registerfooterLink: {
    fontWeight: 'bold',
    color: '#000',
  },
  loginScreenContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  loginLogo: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  loginTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
  },
  loginInputContainer: {
    marginBottom: 15,
  },
  loginLabel: {
    fontSize: 14,
    marginBottom: 5,
  },
  loginInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  loginInput: {
    flex: 1,
    height: 45,
  },
  loginForgotPassword: {
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  loginForgotText: {
    fontSize: 12,
    color: '#888',
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginOrText: {
    textAlign: 'center',
    marginVertical: 10,
    color: '#aaa',
  },
  loginSocialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  loginFooterText: {
    textAlign: 'center',
    color: '#888',
  },
  loginFooterLink: {
    color: '#000',
    fontWeight: 'bold',
  },
  interestContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  interestHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: "center",
    // marginBottom: 10,
  },
  interestBackArrow: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: '#333',
  },
  interestSkipButton: {
    fontSize: 16,
    color: 'black',
  },
  interestTitle: {
    flex: 1,
    alignSelf: "center",
    marginLeft: 95,
    marginTop: 10,
    fontSize: 26,
    fontFamily: "Poppins-Bold",
    // fontWeight: 'bold',
    color: '#333',
  },
  interestSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  interestScroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  interestButton: {
    backgroundColor: '#fff',
    borderColor: '#333',
    borderWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  interestButtonText: {
    fontSize: 14,
    color: '#333',
  },
  // interestContinueButton: {
  //   backgroundColor: 'black',
  //   padding: 12,
  //   borderRadius: 8,
  //   alignItems: 'center',
  //   marginTop: 16,
  //   height: 50,
  //   justifyContent: 'center'
  // },
  interestContinueButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  activeContinueButton: {
    backgroundColor: '#007BFF', // Blue color when active
  },
  inactiveContinueButton: {
    backgroundColor: '#D3D3D3', // Gray color when inactive
  },
  interestContinueButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  questionText: {
    fontFamily: "Poppins-Bold",
    fontSize: 20,
    // fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  questionbuttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  agreeButton: {
    backgroundColor: 'rgba(155, 198, 216, 0.7)', // Background with 70% opacity
    padding: 15,
    borderRadius: 10,
    margin: 5,
    // opacity: 0.7
  },
  neutralButton: {
    backgroundColor: '#efefef',
    padding: 15,
    borderRadius: 10,
    margin: 5,
  },
  disagreeButton: {
    backgroundColor: 'rgba(167, 80, 80, 0.9)', // Background with 90% opacity
    padding: 15,
    borderRadius: 10,
    margin: 5,
  },
  answerText: {
    // fontFamily: "Inter-Regular",
    fontSize: 16,
    color: '#333',
  },
  questionCounter: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    marginTop: 20,
    color: '#666',
  },
  testContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  testTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  testResultType: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4F4F4F',
  },
  testResultSubType: {
    fontSize: 18,
    color: '#888',
  },
  testIntro: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 15,
  },
  testButtonPrimary: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  testButtonSecondary: {
    backgroundColor: 'transparent',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  testButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  testButtonTextSecond: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#635EE2',  // Default background color
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: '80%',
  },
  submitButtonText: {
    fontFamily: "Inter-Bold",
    color: '#fff',
    fontSize: 17,
    // fontWeight: 'bold',

  },
  // Container for the main dashboard screen
  dashboardContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 10, // Add padding to the top
    paddingBottom: 10,
    alignItems: 'center',
  },

  // For community screen (card containing the community info)
  cardContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    paddingTop: 20, // Add padding to the top
    width: '90%',
  },
  cardImageBackground: {
    flex: 1,
    justifyContent: "flex-end"
  },
  cardOverlay: {
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  cardTitle: {
    color: "white",
    fontSize: 22,
    fontFamily: "Inter-SemiBold"
    // fontWeight: "bold"
  },
  cardTags: {
    flexDirection: "row",
    marginTop: 5
  },
  cardTag: {
    fontFamily: "Inter-Regular",
    color: "#ddd",
    marginRight: 10
  },
  loader: {
    marginTop: 10
  },
  cardButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20
  },
  // Home screen container (with posts)
  homeContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    // paddingTop: "30",
  },
  homeheader: {
    backgroundColor: "#ffffff",
    paddingTop: 30,
    paddingBottom: 15,
    alignItems: "center"
  },
  communilogo: {
    height: 35,
    width: 160
  },
  postInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginHorizontal: 2
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postInput: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#f8f9fa",
    fontFamily: "Inter-Regular",

  },
  postButton: {
    color: "#007bff",
    // fontWeight: "bold",
    fontFamily: "Inter-Bold",
    marginLeft: 20,
    marginRight: 5
  },
  previewImage: {
    width: "100%",
    height: 200,
    marginVertical: 10,
  },
  postCard: {
    backgroundColor: "#fff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postUser: {
    // fontWeight: "bold",
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
  },
  postTime: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    color: "#888",
  },
  postContent: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    marginBottom: 10,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-around",              //
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    marginLeft: 5,
    fontSize: 12,
    color: "#555",
  },

  // Chat, Notifications, and Profile screens can use a similar approach.
  dashboardScreen: {
    flex: 1,
    paddingTop: 20,  // Padding added here for consistency
    justifyContent: "center",
    alignItems: "center"
  },

  // Styling for the "No more communities" message
  noMoreText: {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
    marginTop: 20
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedInterestButton: {
    backgroundColor: '#4CAF50', // Highlight color for selected interests
    borderColor: '#4CAF50',
  },

  selectedInterestText: {
    color: '#FFFFFF', // Text color for selected interests
  },
});

export default styles;
