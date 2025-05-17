import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { useRouter, SplashScreen } from 'expo-router';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // Import Picker for dropdowns
import styles from '../styles/styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const Register = () => {

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);
  const [loaded, error] = useFonts({
    "Poppins-Bold": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter/Inter-Bold.ttf"),
    "Inter-Regular": require("../assets/fonts/Inter/Inter-Regular.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter/Inter-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  if (!loaded && !error) {
    return null;
  }

  const [activeTab, setActiveTab] = useState('Student');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState(new Date());
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedYearLevel, setSelectedYearLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const router = useRouter();
  console.log("We are in the Register Screen");

  const maxDate = new Date(2024, 12, 31);

  const capitalizeFirstLetter = (text) => {
    return text.replace(/^\w/, (c) => c.toUpperCase());
  };

  const departmentPrograms = {
    "College of Engineering and Architecture": [
      "BS Arch",
      "BS CE",
      "BS ME",
      "BS CpE",
      "BS GE",
      "BS EE",
      "BS ECE",
      "MEng",
      "MSEE",
      "MS SD (Urban Planning)",
      "PSM PSEM",
      "PhD EE",
    ],
    "College of Information Technology and Computing": [
      "BS IT",
      "BS CS",
      "BS DS",
      "BS TCM",
      "MIT",
      "MS TCM",
    ],
    "College of Science and Mathematics": [
      "BS AM", // Bachelor of Science in Applied Mathematics
      "BS AP", // Bachelor of Science in Applied Physics
      "BS Chem", // Bachelor of Science in Chemistry
      "BS ES", // Bachelor of Science in Environmental Science
      "BS FT", // Bachelor of Science in Food Technology
      "MS AM", // Master of Science in Applied Mathematics
      "MS EST", // Master of Science in Environmental Science and Technology
      "PhD AM", // Doctor of Philosophy in Applied Mathematics
    ],
    "College of Science and Technology Education": [
      "BSEd Science", // Bachelor in Secondary Education Major in Science
      "BSEd Math", // Bachelor in Secondary Education Major in Mathematics
      "BTLEd", // Bachelor in Technology and Livelihood Education
      "BTVTEd", // Bachelor in Technical-Vocational Teacher Education
      "CoT", // Certificate of Teaching
      "MS Math Ed", // Master of Science in Mathematics Education
      "MS Sci Ed Chem", // Master of Science in Science Education (Chemistry)
      "MS Sci Ed Phys", // Master of Science in Science Education (Physics)
      "MA SpEd", // Master of Arts in Teaching Special Education
      "MA TESL", // Master of Arts in Teaching English as a Second Language
      "MTTE", // Master in Technical and Technology Education
      "PhD Math Ed", // Doctor of Philosophy in Mathematics Education
      "PhD Sci Ed Chem", // Doctor of Philosophy in Science Education Major in Chemistry
      "DTech Ed", // Doctor of Technology Education
    ],
    "College of Technology": [
      "Bachelor of Science in Accounting",
      "Bachelor of Science in Marketing",
      "Bachelor of Science in Finance",
    ],
    "College of Medicine": [
    ],
    "Senior High School": [
    ],
  };

  const yearLevels = ["Freshman", "Sophomore", "Junior", "Senior"];

  // Handle department change
  const handleDepartmentChange = (department) => {
    setSelectedDepartment(department);
    setPrograms(departmentPrograms[department] || []); // Update programs based on department
    setSelectedProgram(''); // Reset program selection
  };


  const handleRegister = () => {
    const birthdayFormatted = `${birthday.getFullYear()}-${(birthday.getMonth() + 1).toString().padStart(2, '0')}-${birthday.getDate().toString().padStart(2, '0')}`;

    const today = new Date();
    const birthDate = new Date(birthday);
    const age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    const userData = {
      firstName,
      lastName,
      email,
      password,
      idNumber,
      program: selectedProgram,
      department: selectedDepartment,
      birthday: birthdayFormatted,
      yearlevel: selectedYearLevel,
      likedCommunitiesCount: 0,  // Default value when the user registers

    };

    // console.log('Sending data:', userData);



    if (firstName && lastName && email && password && birthdayFormatted && idNumber && selectedProgram && selectedDepartment && selectedYearLevel) {
      if (!termsAccepted) {
        Alert.alert('Error', 'You must accept the terms and privacy policy to proceed.');
        return;
      }

      if (age < 18 || (age === 18 && month < 0)) {
        Alert.alert('Error', 'You must be at least 18 years old to register.');
        return;
      }

      if (password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters');
        return;
      }


      setLoading(true);
      axios
        .post('http://10.0.2.2:5003/register', userData)
        .then((res) => {
          // console.log(res.data);
          router.navigate({
            pathname: 'startscreen',
            params: { userData: JSON.stringify(userData) },
          });
          console.log("We have just passed the data from the Register screen.");
          console.log("Still in the Register Screen. The passed data is below: ");
          console.log(JSON.stringify(userData));
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            console.log('Response error:', error.response.data);
            // Alert.alert('Error', `Server Error: ${error.response.data}`);
            Alert.alert('Error', `${error.response.data.data || 'Unknown error'}`);
          } else if (error.request) {
            console.log('Request error:', error.request);
            Alert.alert('Error', 'No response from server');
          } else {
            console.log('Error', error.message);
            Alert.alert('Error', `Error: ${error.message}`);
          }
        });
    } else {
      Alert.alert('Please fill in all mandatory fields');
    }

    // if (!termsAccepted) {
    //   Alert.alert('Error', 'You must accept the terms and privacy policy to proceed.');
    //   return;
    // }

    // if (password.length < 6) {
    //   Alert.alert('Error', 'Password must be at least 6 characters');
    //   return;
    // }

    // if (age < 18 || (age === 18 && month < 0)) {
    //   Alert.alert('Error', 'You must be at least 18 years old to register.');
    //   return;
    // }
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      const today = new Date();
      const birthDate = new Date(selectedDate);
      const age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();

      if (age < 18 || (age === 18 && month < 0)) {
        Alert.alert('Error', 'You must be at least 18 years old to register.');
        setBirthday(new Date());
        return;
      } else {
        setBirthday(selectedDate);
      }
    }
  };

  const renderForm = () => {
    return (
      <ScrollView style={styles.registerScreenContainer}>
        <View style={styles.registerContainer}>
          {/* First Name */}
          <View style={styles.registerinputContainer}>
            <Text style={styles.registerlabel}>First Name</Text>
            <TextInput
              placeholder="Enter first name"
              style={styles.registerinput}
              value={firstName}
              onChangeText={(text) => setFirstName(capitalizeFirstLetter(text))}
            />
          </View>

          {/* Last Name */}
          <View style={styles.registerinputContainer}>
            <Text style={styles.registerlabel}>Last Name</Text>
            <TextInput
              placeholder="Enter last name"
              style={styles.registerinput}
              value={lastName}
              onChangeText={(text) => setLastName(capitalizeFirstLetter(text))}
            />
          </View>

          {/* Birthday */}
          <View style={styles.registerinputContainer}>
            <Text style={styles.registerlabel}>Birthday</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.registerinput}>
              <Text style={styles.registerinputText}>
                {birthday.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={birthday}
                mode="date"
                display="default"
                onChange={onDateChange}
                maximumDate={maxDate} // Set max date to December 31, 2024
              />
            )}
          </View>

          {/* Email */}
          <View style={styles.registerinputContainer}>
            <Text style={styles.registerlabel}>Email</Text>
            <TextInput
              placeholder="Enter email"
              style={styles.registerinput}
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* ID Number */}
          <View style={styles.registerinputContainer}>
            <Text style={styles.registerlabel}>ID Number</Text>
            <TextInput
              placeholder="Enter ID number"
              keyboardType="numeric"
              style={styles.registerinput}
              value={idNumber}
              onChangeText={(value) => setIdNumber(value.replace(/[^0-9]/g, ''))} // Only numbers
            />
          </View>

          {/* Password */}
          <View style={styles.registerinputContainer}>
            <Text style={styles.registerlabel}>Password</Text>
            <TextInput
              placeholder="Enter password"
              secureTextEntry
              style={styles.registerinput}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Department Dropdown */}
          <View style={styles.registerinputContainer}>
            <Text style={styles.dpy}>Department</Text>
            <View style={[styles.pickerContainer, { borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }]}>
              <Picker
                selectedValue={selectedDepartment}
                onValueChange={handleDepartmentChange}
                style={[styles.dpyinput, { fontSize: 14 }]}  // Ensure fontSize is consistent for the text in the Picker
              >
                <Picker.Item label="Select your department" value="" style={{ fontSize: 14 }} />
                {Object.keys(departmentPrograms).map((department) => (
                  <Picker.Item key={department} label={department} value={department} style={{ fontSize: 14 }} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Program Dropdown */}
          <View style={styles.registerinputContainer}>
            <Text style={styles.dpy}>Program</Text>
            <View style={[styles.pickerContainer, { borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }]}>
              <Picker
                selectedValue={selectedProgram}
                onValueChange={(program) => setSelectedProgram(program)}
                style={[styles.dpyinput, { fontSize: 14 }]}  // Ensure fontSize is consistent for the text in the Picker
                enabled={programs.length > 0}
              >
                <Picker.Item label="Select your program" value="" style={{ fontSize: 14 }} />
                {programs.map((program) => (
                  <Picker.Item key={program} label={program} value={program} style={{ fontSize: 14 }} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Year Level Dropdown */}
          <View style={styles.registerinputContainer}>
            <Text style={styles.dpy}>Year Level</Text>
            <View style={[styles.pickerContainer, { borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }]}>
              <Picker
                selectedValue={selectedYearLevel}
                onValueChange={(yearLevel) => setSelectedYearLevel(yearLevel)}
                style={[styles.dpyinput, { fontSize: 14 }]}  // Ensure fontSize is consistent for the text in the Picker
              >
                <Picker.Item label="Select your year level" value="" style={{ fontSize: 14 }} />
                {yearLevels.map((yearLevel) => (
                  <Picker.Item key={yearLevel} label={yearLevel} value={yearLevel} style={{ fontSize: 14 }} />
                ))}
              </Picker>
            </View>
          </View>



          {/* Terms and Policy */}
          <TouchableOpacity
            style={styles.registertermsContainer}
            onPress={() => setTermsAccepted(!termsAccepted)}
          >
            <MaterialCommunityIcons
              name={termsAccepted ? 'checkbox-marked' : 'checkbox-blank-outline'}
              size={20}
            />
            <Text style={styles.registertermsText}>
              I accept the terms and privacy policy
            </Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity style={styles.registerbutton} onPress={handleRegister}>
            <Text style={styles.registerbuttonText}>Create account</Text>
          </TouchableOpacity>

          <Text style={styles.registerfooterText}>
            Already have an account?{' '}
            <Text
              style={styles.registerfooterLink}
              onPress={() => router.replace('login')}
            >
              Log in
            </Text>
          </Text>
        </View>
      </ScrollView>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.registerScreenContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
    >
      <View style={styles.headerContainer}></View>
      <View style={styles.starstar}>
        <Image source={require('../styles/Frame.png')} style={styles.loginLogo} />

      </View>

      <Text style={styles.registerLogo}>CommUNI</Text>

      {/* Tab Switcher */}
      <View style={styles.registerTabContainer}>
        <Text style={[styles.registertabText, activeTab === 'Student' && styles.registeractiveTabText]}>
          Student Registration
        </Text>
      </View>

      {/* Form */}
      {renderForm()}

      {/* Loading Screen */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default Register;
