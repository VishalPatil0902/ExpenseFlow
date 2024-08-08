import React,{useState} from 'react';
import DetectObject from '../../Components/Detectobject';
import { View, Text,TextInput,TouchableOpacity,ScrollView,StyleSheet,SafeAreaView,Button} from 'react-native';
import {ChevronLeftIcon,AtSymbolIcon,BuildingOffice2Icon,MapPinIcon,ClipboardDocumentCheckIcon,CalendarDaysIcon,CurrencyRupeeIcon} from 'react-native-heroicons/solid';
import { Input } from "@rneui/base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DynamicInput from '../../Components/InputShow';
import "firebase/firestore";
import { db } from "../../Firebase/firebase";
import { doc, setDoc ,getDoc,collection,getDocs} from "firebase/firestore"; 
import { useAuth } from '../../Firebase/AuthContextProvider';

const AddExpense = () => {

  const { user } = useAuth(); 

  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [GSTIN, setGSTIN] = useState('');
  const [date, setDate] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [image,setimage]=useState("");
  const [data, setdata] = useState(null);


  const handleExtractionComplete = (data) => {
      setTitle(data.name);
      setAddress(data.address);
      setGSTIN(data.gstin);
      setDate(data.date);
      setTotalAmount(data.total);
      setimage(data.image);

      function generateRandomNumber() {
        return Math.floor(10000 + Math.random() * 90000);
      }
      
      const randomFiveDigitNumber = generateRandomNumber();

      const newdata={
        name:data.name,
        address:data.address,
        gstin:data.gstin,
        date:data.date,
        total:data.total,
        id:randomFiveDigitNumber,
        status:'Pending',
      }

      console.log(newdata);

      setdata(newdata);
  };

  const handlesubmit= async ()=>{
    console.log("this->",user);
    console.log(user.email);
    const path = `/Employees/${user.email}`;
    
    try {
      const docRef = doc(db, path);
      const docSnapshot = await getDoc(docRef);
      const userData = docSnapshot.data();
  
      console.log("values before setDoc:", data);
  
          const updatedData = {
            ...userData,
            Receiptdetails: userData.Receiptdetails
              ? [...userData.Receiptdetails, data]
              : [data],
          };
  
          await setDoc(docRef, updatedData);
          console.log("data inserted successfully")
        } catch (error) {
          console.log("Error adding competition data 😢 :", error);
    }
  
    setdata(null);
  }

return(
  <ScrollView className=" h-[100%] flex flex-col mb-20 bg-[#EAECF9]" contentContainerStyle={{ alignItems: 'center' }} showsVerticalScrollIndicator={false}>
    <View className='w-full h-16 '>
      <View className="flex-row mt-3 ml-2 items-center w-full">
        <Text className='font-bold text-center text-lg w-[100%] mt-4'>ADD EXPENSE</Text>
      </View>
    </View>
    <View className='p-2'>
      <DetectObject onExtractionComplete={handleExtractionComplete}/>
    </View>
    <View className='bg-yellow-400 rounded-lg h-1 w-[90%]'></View>
    <View className='flex flex-col w-[90%]'>
      <View className=''></View>

      <Text className='font-semibold mt-2'>RESTAURANT NAME:</Text>
      <View className='w-[100%] bg-[#f1f1ec] border flex-row flex-wrap p-1 mt-2 mb-5 rounded-lg '  style={{ elevation: 10}}>
        <View className='bg-[#fcc442] p-1 mr-2 rounded-lg h-10' style={{ elevation: 5 }}><BuildingOffice2Icon color="white" size={30} /></View>
        <ScrollView horizontal className='bg-white rounded p-2 m-0.5' style={{elevation:5}}><Text className='font-bold'>{title}</Text></ScrollView>
      </View>

      <Text className='font-semibold mt-2'>ADDRESS:</Text>
      <View className='w-[100%] bg-[#f1f1ec] border flex-row flex-wrap p-1 mt-2 mb-5 rounded-lg '  style={{ elevation: 10}}>
        <View className='bg-[#fcc442] p-1 mr-2 rounded-lg h-10' style={{ elevation: 5 }}><MapPinIcon color="white" size={30} /></View>
        <ScrollView horizontal className='bg-white rounded p-2 m-0.5 ' style={{elevation:5}}><Text className='font-bold pr-5'>{address}</Text></ScrollView>
      </View>

      <Text className='font-semibold mt-2'>GSTIN:</Text>
      <View className='w-[100%] bg-[#f1f1ec] border flex-row flex-wrap p-1 mt-2 mb-5 rounded-lg '  style={{ elevation: 10}}>
        <View className='bg-[#fcc442] p-1 mr-2 rounded-lg' style={{ elevation: 5 }}><ClipboardDocumentCheckIcon color="white" size={30} /></View>
        <ScrollView horizontal className='bg-white rounded p-2 m-0.5' style={{elevation:5}}><Text className='font-bold'>{GSTIN}</Text></ScrollView>
      </View>

      <Text className='font-semibold mt-2'>DATE:</Text>
      <View className='w-[100%] bg-[#f1f1ec] border flex-row flex-wrap p-1 mt-2 mb-5 rounded-lg '  style={{ elevation: 10}}>
        <View className='bg-[#fcc442] p-1 mr-2 rounded-lg' style={{ elevation: 5 }}><CalendarDaysIcon color="white" size={30} /></View>
        <ScrollView horizontal className='bg-white rounded p-2 m-0.5' style={{elevation:5}}><Text className='font-bold'>{date}</Text></ScrollView>
      </View>

      <Text className='font-semibold mt-2'>TOTAL:</Text>
      <View className='w-[100%] bg-[#f1f1ec] border flex-row flex-wrap p-1 mt-2 mb-5 rounded-lg '  style={{ elevation: 10}}>
        <View className='bg-[#fcc442] p-1 mr-2 rounded-lg' style={{ elevation: 5 }}><CurrencyRupeeIcon color="white" size={30} /></View>
        <ScrollView horizontal className='bg-white rounded p-2 m-0.5' style={{elevation:5}}><Text className='font-bold'>{totalAmount}</Text></ScrollView>
      </View>
      {data &&       <TouchableOpacity className=' bg-green-500 p-2 rounded-md w-full  mb-6 border' style={{ elevation: 10 }}>
          <Text className='font-bold text-lg text-center text-white' onPress={handlesubmit}>Submit</Text>
      </TouchableOpacity>}


    </View>
  </ScrollView>
)
}

export default AddExpense;



