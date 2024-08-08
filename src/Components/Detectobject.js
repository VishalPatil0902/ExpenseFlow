 import React, { useState } from 'react';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";


const DetectObject = ({ onExtractionComplete }) => {
    
    
    const navigation = useNavigation();

    const [imageUri, setImageUri] = useState(null);
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [GSTIN, setGSTIN] = useState('');
    const [date, setDate] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [loading,setloading]=useState(false);


    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [2, 4],
                quality: 1,
            });

            if (!result.cancelled) {
                setImageUri(result.assets[0].uri);
            }

            console.log(result);
        } catch (error) {
            console.error("Error Picking Image : ", error);
        }
    }

    const analyzeImage = async () => {
        if(!loading){
            try {
                if (!imageUri) {
                    alert("Please select an image first!");
                    return;
                }
    
                const apikey = "AIzaSyAdOkur14zzmi7DVIvWwEgdlDxOHCOyfuo"; // Replace 'YOUR_API_KEY' with your actual API key
                const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${apikey}`;
    
                setloading(true);
                const base64ImageData = await FileSystem.readAsStringAsync(imageUri, {
                    encoding: FileSystem.EncodingType.Base64,
                });
    
                const requestData = {
                    "requests": [
                        {
                            "image": {
                                "content": base64ImageData,
                            },
                            "features": [
                                {
                                    "type": "TEXT_DETECTION"
                                }
                            ]
                        }
                    ]
                }
    
                const apiResponse = await axios.post(apiUrl, requestData);
                const ocrText = apiResponse.data.responses[0].fullTextAnnotation.text;
                console.log(ocrText);
    
                // Extracting title
                const titleMatch = ocrText.match(/^[^\n]+/);
                setTitle(titleMatch ? titleMatch[0].trim() : '');
    
                // Extracting address
                const addressMatch = ocrText.match(/^([^\n]+\n){4}/);
                setAddress(addressMatch ? addressMatch[0].trim() : '');
    
                // Extracting GSTIN or GSTNO
                const GSTINMatch = ocrText.match(/GST(IN|NO)\s*:\s*([^\s]+)/);
                setGSTIN(GSTINMatch ? GSTINMatch[2].trim() : '');
    
                // Extracting date
                const dateRegex = /(?:DATE|Dt|Date)\s*:\s*([^\s]+)/;
                const dateMatch = ocrText.match(dateRegex);
                setDate(dateMatch ? dateMatch[1].trim() : '');
    
                // Extracting total amount
                const totalAmountRegex = /\b(?:Total|TOTAL|Bill Total|BILL TOTAL|NET AMT)\s*:\s*Rs\s*([\d,]+(?:\.\d{1,2})?)\b/;
                const totalAmountMatch = ocrText.match(totalAmountRegex);
                setTotalAmount(totalAmountMatch ? totalAmountMatch[1] : '');
    
                
                const extractedData={
                    name:titleMatch ? titleMatch[0].trim() : '',
                    address:addressMatch ? addressMatch[0].trim() : '',
                    gstin:GSTINMatch ? GSTINMatch[2].trim() : '',
                    date:dateMatch ? dateMatch[1].trim() : '',
                    total:totalAmountMatch ? totalAmountMatch[1] : '',
                    image:base64ImageData
                }
    
                onExtractionComplete(extractedData);
    
                console.log("Title:", title);
                console.log("Address:", address);
                console.log("GSTIN:", GSTIN);
                console.log("Date:", date);
                console.log("Total Amount:", totalAmount);
                setloading(false);
    
            } catch (error) {
                console.log("Something went wrong :", error);
                alert("Something went wrong :", error);
            }
        }

    }

    return (
        <View contentContainerStyle={styles.container} className='p-1 w-[100%] flex flex-col items-center mt-1 mb-5 '>
            {
                imageUri && (
                    <Image source={{ uri: imageUri }} style={{ width: 340, height: 'auto', aspectRatio: 2 / 4, elevation: 10 }} className='rounded-lg border-2' resizeMode='contain' />
                )
            }

            <View className='flex flex-row p-1 mt-3 justify-evenly w-full'>
                <TouchableOpacity onPress={pickImage} className=' bg-[#E2AD36] p-2 rounded-md w-[47%] border' style={{ elevation: 10 }}>
                    <Text className='font-semibold text-lg text-center'>Upload</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={analyzeImage} className='bg-[#E2AD36] p-2 rounded-md  w-[47%] border' style={{ elevation: 10 }}>
                    {!loading && <Text className='font-semibold text-lg text-center'>Analyze</Text>}

                    {loading &&  <ActivityIndicator animating={true} color={MD2Colors.red800} />}

                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default DetectObject;
