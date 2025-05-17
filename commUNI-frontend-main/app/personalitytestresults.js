import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';

export default function PersonalityResultScreen() {
    const route = useRoute();
    const router = useRouter();
    const { userData, mbti } = route.params || {}; // Extracting userData from the route parameters
    console.log("We are now in the Personality Test Results screen");
    console.log("Here is what was received from the previous screen: ");
    console.log(userData, mbti);
    console.log("Here is what will be passed to the Interests screen: ");
    console.log(userData, mbti);


    const descriptions = {
        "ENFP": {
            title: "Campaigner",
            description: "As an ENFP (Campaigner), you’re a true free spirit – outgoing, openhearted, and open-minded. Your lively, upbeat energy makes you stand out in any crowd, and while you know how to have fun, there’s so much more to you. You have a deep desire for meaningful, emotional connections with others, and that’s what really drives you.",
            traits: ["Enthusiastic", "Creative", "Social", "Curious", "Empathetic"]
        },
        "INFP": {
            title: "Mediator",
            description: "As an INFP (Mediator), you are an idealistic person who values harmony and authenticity. You have a deep understanding of people’s emotions and a genuine desire to help others. You are highly empathetic and tend to seek out meaning in everything you do.",
            traits: ["Idealistic", "Empathetic", "Introspective", "Creative", "Compassionate"]
        },
        "ENFJ": {
            title: "Protagonist",
            description: "As an ENFJ (Protagonist), you are charismatic, warm, and driven by a desire to help others reach their full potential. You excel at bringing people together and inspiring them to work toward a common goal. Your focus on social harmony makes you a natural leader and mentor.",
            traits: ["Charismatic", "Altruistic", "Natural leader", "Empathetic", "Organized"]
        },
        "INFJ": {
            title: "Advocate",
            description: "As an INFJ (Advocate), you are an idealistic person with a strong sense of purpose. You strive to help others and make a difference in the world. Your insight into people’s feelings and motivations gives you an edge in understanding the world around you.",
            traits: ["Empathetic", "Insightful", "Determined", "Visionary", "Altruistic"]
        },
        "ENTP": {
            title: "Debater",
            description: "As an ENTP (Debater), you are inventive and curious, with a natural ability to see both sides of any issue. You love intellectual challenges and thrive on debates. Your quick wit and analytical mind make you excellent at solving complex problems.",
            traits: ["Curious", "Inventive", "Analytical", "Outgoing", "Witty"]
        },
        "INTP": {
            title: "Logician",
            description: "As an INTP (Logician), you are a thinker at heart. You value logic, reason, and intellectual pursuits. You enjoy exploring abstract concepts and solving complex problems. Your independent nature drives you to seek out new ideas and theories.",
            traits: ["Analytical", "Curious", "Innovative", "Independent", "Logical"]
        },
        "ENTJ": {
            title: "Commander",
            description: "As an ENTJ (Commander), you are a natural-born leader with a strong drive to achieve your goals. You are strategic, organized, and efficient, and you excel at making tough decisions and leading teams. Your confidence and vision make you a powerful force in both personal and professional settings.",
            traits: ["Decisive", "Strategic", "Ambitious", "Confident", "Organized"]
        },
        "INTJ": {
            title: "Architect",
            description: "As an INTJ (Architect), you are a visionary with a clear sense of purpose. You are independent, logical, and strategic, and you approach life with a calm and collected demeanor. Your ability to see the big picture and plan for the future makes you a master at achieving long-term goals.",
            traits: ["Strategic", "Independent", "Innovative", "Analytical", "Visionary"]
        },
        "ESFP": {
            title: "Entertainer",
            description: "As an ESFP (Entertainer), you are spontaneous, energetic, and love to be the center of attention. You have a natural ability to make others laugh and feel comfortable. You live in the moment and enjoy making the most out of every experience.",
            traits: ["Spontaneous", "Energetic", "Sociable", "Optimistic", "Fun-loving"]
        },
        "ISFP": {
            title: "Adventurer",
            description: "As an ISFP (Adventurer), you are an artistic, free-spirited individual who values beauty and creativity. You enjoy experiencing life through your senses and have a deep appreciation for art, nature, and experiences that evoke emotion.",
            traits: ["Creative", "Sensitive", "Adventurous", "Empathetic", "Artistic"]
        },
        "ESTP": {
            title: "Entrepreneur",
            description: "As an ESTP (Entrepreneur), you are energetic, action-oriented, and love to take risks. You thrive in the present moment and enjoy solving problems quickly. Your practical approach and quick thinking make you an excellent troubleshooter and leader in high-pressure situations.",
            traits: ["Energetic", "Practical", "Adventurous", "Outgoing", "Problem-solver"]
        },
        "ISTP": {
            title: "Virtuoso",
            description: "As an ISTP (Virtuoso), you are an independent, action-oriented person who values logic and practicality. You enjoy hands-on activities and are skilled at understanding how things work. Your ability to stay calm under pressure allows you to thrive in challenging situations.",
            traits: ["Practical", "Independent", "Analytical", "Resourceful", "Calm"]
        },
        "ESFJ": {
            title: "Consul",
            description: "As an ESFJ (Consul), you are caring, empathetic, and highly attuned to the needs of others. You enjoy helping people and creating a harmonious environment. Your strong social skills and loyalty make you a trusted friend and an excellent team player.",
            traits: ["Caring", "Loyal", "Sociable", "Empathetic", "Organized"]
        },
        "ISFJ": {
            title: "Defender",
            description: "As an ISFJ (Defender), you are responsible, nurturing, and dedicated to helping others. You have a strong sense of duty and loyalty, and you are always ready to offer support and care to those in need. Your reliability and attention to detail make you a dependable friend and colleague.",
            traits: ["Responsible", "Loyal", "Caring", "Organized", "Supportive"]
        },
        "ESTJ": {
            title: "Executive",
            description: "As an ESTJ (Executive), you are practical, efficient, and highly organized. You value structure, rules, and traditions, and you take your responsibilities seriously. Your strong leadership skills and ability to make decisions help you achieve your goals and inspire those around you.",
            traits: ["Organized", "Decisive", "Practical", "Loyal", "Efficient"]
        },
        "ISTJ": {
            title: "Logistician",
            description: "As an ISTJ (Logistician), you are practical, reliable, and detail-oriented. You value tradition and responsibility and prefer to work within established systems and processes. Your careful planning and logical thinking make you excellent at solving problems and meeting goals.",
            traits: ["Reliable", "Practical", "Logical", "Responsible", "Detail-oriented"]
        }
    };


    const personalityData = descriptions[mbti] || {
        title: "Unknown",
        description: "Your personality is unique, and we are still learning about it!",
        traits: ["Curious", "Adaptable"]
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backButtonText} onPress={() => router.back()}>{"<"}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Your personality type is:</Text>
                <Text style={styles.headerSubtitle}>{personalityData.title}</Text>
                <Text style={styles.personalityType}>{mbti}</Text>
            </View>

            {/* Content */}
            <ScrollView style={styles.content}>
                <Text style={styles.sectionTitle}>Introduction</Text>
                <Text style={styles.description}>
                    {personalityData.description}
                </Text>

                <Text style={styles.sectionTitle}>Key Traits</Text>
                <View style={styles.traitsContainer}>
                    {/* <Text style={styles.trait}>Enthusiastic</Text>
                    <Text style={styles.trait}>Creative</Text>
                    <Text style={styles.trait}>Social</Text> */}
                    {personalityData.traits.map((trait, index) => (
                        <Text key={index} style={styles.trait}>{trait}</Text>
                    ))}
                </View>
            </ScrollView>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
                {/* Navigate to the interests.js screen and pass userData */}
                <TouchableOpacity
                    style={[styles.button, styles.primaryButton]}
                    onPress={() => router.push({ pathname: 'interests', params: { userData } })}
                >
                    <Text style={styles.buttonText}>Choose your interests</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
                    <Text style={[styles.buttonText, styles.secondaryButtonText]} onPress={() => router.navigate({ pathname: 'dashboard', params: { userData } })}>Find communities</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        backgroundColor: '#4CAF50',
        paddingVertical: 20,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 15,
        left: 15,
    },
    backButtonText: {
        fontFamily: "Poppins-Bold",
        fontSize: 19,
        color: '#FFFFFF',
    },
    headerTitle: {
        fontFamily: "Inter-Regular",
        color: '#FFFFFF',
        fontSize: 16,
        marginTop: 10,
    },
    headerSubtitle: {
        fontFamily: "Poppins-Bold",
        color: '#FFFFFF',
        fontSize: 24,
        // fontWeight: 'bold',
        marginTop: 5,
    },
    personalityType: {
        fontFamily: "Poppins-Bold",
        color: '#FFFFFF',
        fontSize: 18,
        marginTop: 5,
        fontWeight: '600',
    },
    content: {
        padding: 20,
        flex: 1, // Ensure the content takes up available space
        marginBottom: 10
    },
    sectionTitle: {
        fontFamily: "Poppins-Bold",

        fontSize: 16,
        // fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
    },
    description: {
        fontFamily: "Inter-Regular",
        textAlign: "justify",
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
        marginBottom: 15,
        paddingHorizontal: 5, // Add horizontal padding to prevent text cutoff

    },
    traitsContainer: {
        marginTop: 5,
        marginBottom: 35,
        paddingHorizontal: 5
    },
    trait: {
        fontSize: 14,
        color: '#333',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    buttonContainer: {
        paddingHorizontal: 15,
        // marginBottom: 10,
    },
    button: {
        borderRadius: 25,
        paddingVertical: 15,
        marginVertical: 5,
        alignItems: 'center',
    },
    primaryButton: {
        backgroundColor: '#635EE2',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
    },
    buttonText: {
        fontFamily: "Inter-SemiBold",
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    secondaryButtonText: {
        fontFamily: "Inter-Bold",
        color: '#000000',
    },
});
