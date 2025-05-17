import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    testContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff', // White background
    },
    testHeader: {
        alignItems: 'center',
        marginBottom: 40,
    },
    testImage: {
        width: 250, // Adjust width as needed
        height: 200, // Adjust height as needed
        // marginBottom: 10, // Add spacing between the image and the text
    },
    testTitle: {
        fontSize: 25,
        fontFamily: "Poppins-SemiBold",
        // fontWeight: 'bold',
        color: '#000000', // Black text
        textAlign: 'center',
    },
    testSubtitleWrapper: {
        marginHorizontal: 15
    },
    testSubtitle: {
        fontSize: 15,
        fontFamily: "Poppins-Regular",
        color: '#6b6b6b', // Grey text
        textAlign: 'center',
        marginTop: 16,
    },
    testButtonPrimary: {
        backgroundColor: '#000000', // Black button
        paddingVertical: 15,
        borderRadius: 8,
        marginBottom: 15,
        width: '90%', // Make the button take 80% of the screen width
        alignItems: 'center',
    },
    testButtonSecondary: {
        backgroundColor: '#ffffff', // White button
        paddingVertical: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#000000', // Black border
        width: '90%', // Make the button take 80% of the screen width
        alignItems: 'center',
    },
    testButtonText: {
        fontSize: 16,
        fontFamily: "Inter-SemiBold",
        color: '#ffffff', // White text for the primary button
        // fontWeight: 'bold',
        textAlign: 'center',
    },
    testButtonTextSecondary: {
        fontSize: 16,
        fontFamily: "Inter-SemiBold",

        color: '#000000', // Black text for the secondary button
        // fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default styles;
