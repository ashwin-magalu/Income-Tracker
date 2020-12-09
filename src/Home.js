import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  Button,
  View,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import moment from "moment";

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([
    { date: moment().format("LL"), amount: 2000 },
    { date: moment().subtract(1, "days").format("LL"), amount: 2500 },
    { date: moment().subtract(3, "days").format("LL"), amount: 3500 },
    { date: moment().subtract(1, "days").format("LL"), amount: 3500 },
    { date: moment().subtract(5, "days").format("LL"), amount: 3500 },
    { date: moment().subtract(7, "days").format("LL"), amount: 3500 },
    { date: moment().subtract(6, "days").format("LL"), amount: 3500 },
    { date: moment().subtract(5, "days").format("LL"), amount: 3500 },
    { date: moment().subtract(4, "days").format("LL"), amount: 3500 },
    { date: moment().subtract(3, "days").format("LL"), amount: 4500 },
    { date: moment().subtract(2, "days").format("LL"), amount: 5500 },
    { date: moment().subtract(2, "days").format("LL"), amount: 5500 },
  ]);
  const [transformedData, setTransformedData] = useState([]);

  useEffect(() => {
    setTransformedData(transformData(groupBy(data, "date")));
    setIsLoading(false);
  }, [data]);

  const groupBy = (array, key) =>
    array.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});

  const [gigs, setGigs] = useState([
    {
      description: "Freelance job with XYZ",
      amount: 499.99,
      timestamp: new Date(),
    },
  ]);

  const getDates = () => transformedData.map((pair) => pair.date);

  const getAmounts = () => transformedData.map((pair) => pair.amount);

  const transformData = (groupedData) => {
    const transformedArray = [];

    Object.entries(groupedData).forEach((entry) => {
      const total = entry[1].reduce((total, pair) => total + pair.amount, 0);
      transformedArray.push({
        date: moment(entry[0]).format("MM/DD"),
        amount: total,
      });
    });

    const sortedArray = transformedArray.sort((a, b) =>
      moment(a["date"]).diff(moment(b["date"]))
    );

    return sortedArray;
  };

  console.log("DEBUG 🔥", data);
  console.log("The Dates ⏲️", getDates());
  console.log("The Amounts ⏲️", getAmounts());
  console.log(
    "The GROUPED values are ⏲️",
    Object.entries(groupBy(data, "date"))
  );
  console.log(
    "The Total grouped value 👽",
    transformData(groupBy(data, "date"))
  );

  useEffect(() => {
    setTotal(gigs.reduce((total, gig) => total + Number(gig.amount), 0));
  }, [gigs]);

  const addGig = () => {
    setGigs([
      ...gigs,
      {
        description: description,
        amount: amount,
      },
    ]);

    setData([
      ...data,
      {
        date: moment().format("LL"),
        amount: Number(amount),
      },
    ]);

    setDescription("");
    setAmount("");
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
        {isLoading ? (
          <View>
            <ActivityIndicator />
          </View>
        ) : (
          <View>
            <View>
              <Text style={styles.titleText}>
                Let's build a React Native App to Track Income 🚀 🚀 🚀
              </Text>
            </View>
            <Button
              title="Go to Login page"
              onPress={() => navigation.navigate("Login Page")}
            />
            <View>
              <Text>Bezier Line Chart</Text>
              {
                <LineChart
                  data={{
                    labels: getDates(),
                    datasets: [
                      {
                        data: getAmounts(),
                      },
                    ],
                  }}
                  width={Dimensions.get("window").width} // from react-native
                  height={220}
                  yAxisLabel="$"
                  yAxisInterval={1} // optional, defaults to 1
                  chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "green",
                    backgroundGradientTo: "green",
                    decimalPlaces: null, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) =>
                      `rgba(255, 255, 255, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: "6",
                      strokeWidth: "2",
                      stroke: "#ffa726",
                    },
                  }}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                />
              }
            </View>
            <Text>Total Income: ${total} </Text>
            <TextInput
              style={styles.input}
              value={description}
              placeholder="Enter a description"
              onChangeText={(text) => setDescription(text)}
            />
            <TextInput
              style={styles.input}
              value={amount}
              placeholder="Enter the amount you made in USD ($)"
              keyboardType="numeric"
              onChangeText={(text) => setAmount(text)}
            />
            <Button
              disabled={!amount && !description}
              onPress={addGig}
              title="Add Gig 🚀"
            />
            {gigs.map((gig) => (
              <View key={gig.timestamp}>
                <Text>{gig.description}</Text>
                <Text>${gig.amount}</Text>
              </View>
            ))}
          </View>
        )}
        {/*  </TouchableWithoutFeedback>
        </KeyboardAvoidingView> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginTop: 20,
    height: 40,
    borderColor: "blue",
    borderWidth: 1,
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
  },
});
