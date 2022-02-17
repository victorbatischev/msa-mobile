import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  Image,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/Styles";
import axios from "axios";
import CompleteWorkShift from "./CompleteWorkShiftModal";
import { Send } from "react-native-gifted-chat";

const UsersMenuModal = ({ setModalVisible, logOut }) => {
  const [isModalNewOrder, setIsModalNewOrder] = useState(false);
  const [isModalGetDetails, setIsModalGetDetails] = useState(false);
  const [isCompleteWorhShiftVisible, setIsCompleteWorhShiftVisible] =
    useState(false);
  const [orders, setOrders] = useState([]);
  const [tempDetail, setTempDetail] = useState({});
  const [createdOrderId, setCreatedOrderId] = useState(null);

  const [isValidate, setIsValidate] = useState(false);

  const addOrdersArr = (data) => {
    let arr = [];
    for (let i = 0; ; i++) {
      if (data[0].value[`Delivery (detail ${i + 1})`]) {
        arr.push(data[0].value[`Delivery (detail ${i + 1})`]);
      } else break;
    }
    setOrders(arr);
  };

  const menuItemHandler = async (item) => {
    setTempDetail(item);
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    setTempDetail((prev) => ({
      ...prev,
      order: {
        ...prev.order,
        composition: {
          ...prev.order.composition,
          ["Worker"]: user.name,
          ["Worker id"]: user.u_id,
        },
      },
    }));
    setIsModalGetDetails(true);
  };

  const getNewOrder = async () => {
    axios.get("deskbook_info/61f5b6541f1d04747fffe837").then((res) => {
      addOrdersArr(res.data);
    });
  };

  const addingEmployeToOrder = () => {
    axios
      .post("worker_order_worker_add", {
        _id: createdOrderId,
        worker: {
          o_id: tempDetail.worker.o_id,
          w_id: tempDetail.order.composition["Worker id"],
          name: tempDetail.order.composition["Worker"],
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        const obj = {
          _id: createdOrderId,
          worker: {
            o_id: tempDetail.worker.o_id,
            w_id: tempDetail.order.composition["Worker id"],
            name: tempDetail.order.composition["Worker"],
          },
        };
        console.log(obj);
      });
  };

  const sendingOrdeForExecution = () => {
    axios
      .post("worker_order_execution", {
        _id: createdOrderId,
        s_id: tempDetail.stream,
      })
      .then((res) => {
        addingEmployeToOrder();
      });
  };

  const sendFormData = () => {
    if (tempDetail.order.composition["Workplace"]) {
      axios
        .post("worker_new_order_pending", {
          type: "template",
          name: tempDetail.order.name,
          composition: {
            "What to deliver?":
              tempDetail.order.composition["What to deliver?"],
            "Detail id": tempDetail.order.composition["Detail id"],
            Workplace: tempDetail.order.composition["Workplace"],
            Worker: tempDetail.order.composition["Worker"],
            "Worker id": tempDetail.order.composition["Worker id"],
          },
        })
        .then((res) => {
          setCreatedOrderId(res.data);
          sendingOrdeForExecution();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsModalGetDetails(false);
          setIsValidate(false);
        });
    } else setIsValidate(true);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View style={myStyles.container}>
        <View style={myStyles.menuItemBlock}>
          <Pressable
            style={myStyles.menuItem}
            onPress={() => {
              getNewOrder();
              setIsModalNewOrder(true);
            }}
          >
            <Text style={myStyles.menuItemText}>New order</Text>
          </Pressable>
          <Pressable
            style={myStyles.menuItem}
            onPress={() => setIsCompleteWorhShiftVisible(true)}
          >
            <Text style={myStyles.menuItemText}>Logout</Text>
          </Pressable>
        </View>
        <View style={{ marginTop: 100 }}>
          <Pressable
            style={{
              ...styles.center,
              ...styles.cancelContainer,
            }}
            onPress={() => setModalVisible(false)}
          >
            <Image
              style={{ width: 20, height: 20, marginRight: 15 }}
              source={require("../assets/images/close.png")}
            />
            <Text
              style={{
                fontFamily: "Roboto",
                fontSize: 18,
                color: "#6C6F72",
              }}
            >
              Cancel
            </Text>
          </Pressable>
        </View>
        <Modal
          animationType="slider"
          transparent={true}
          visible={isModalNewOrder}
        >
          <View style={myStyles.container}>
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text
                style={[
                  myStyles.menuItemText,
                  { fontSize: 24, marginBottom: 45 },
                ]}
              >
                New order
              </Text>
              <View style={myStyles.menuItemBlock}>
                {orders.map((item, index) => {
                  return (
                    <Pressable
                      style={myStyles.menuItem}
                      key={index}
                      onPress={() => menuItemHandler(item)}
                    >
                      <Text style={myStyles.menuItemText}>
                        {item.order.name}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
            <Pressable
              style={{
                ...styles.center,
                ...styles.cancelContainer,
              }}
              onPress={() => setIsModalNewOrder(false)}
            >
              <Image
                style={{ width: 20, height: 20, marginRight: 15 }}
                source={require("../assets/images/close.png")}
              />
              <Text
                style={{
                  fontFamily: "Roboto",
                  fontSize: 18,
                  color: "#6C6F72",
                }}
              >
                Cancel
              </Text>
            </Pressable>
          </View>
          <Modal
            animationType="slider"
            transparent={false}
            visible={isModalGetDetails}
          >
            <View style={myStyles.container}>
              <View style={{ width: "100%", alignItems: "center" }}>
                <Text
                  style={{ color: "#fff", fontSize: 24, textAlign: "center" }}
                >
                  {tempDetail.order?.name}
                </Text>
                <View
                  style={{ alignItems: "center", width: "100%", marginTop: 5 }}
                >
                  <Text style={{ color: "#fff", fontSize: 14, width: "85%" }}>
                    What to deliver?
                  </Text>
                  <TextInput
                    style={myStyles.input}
                    value={tempDetail.order?.composition["What to deliver?"]}
                    onChangeText={(text) => {
                      setTempDetail((prev) => ({
                        ...prev,
                        order: {
                          ...prev.order,
                          composition: {
                            ...prev.order.composition,
                            ["What to deliver?"]: text,
                          },
                        },
                      }));
                    }}
                  ></TextInput>
                </View>
                <View
                  style={{ alignItems: "center", width: "100%", marginTop: 5 }}
                >
                  <Text style={{ color: "#fff", fontSize: 14, width: "85%" }}>
                    Detail id
                  </Text>
                  <TextInput
                    style={myStyles.input}
                    value={tempDetail.order?.composition["Detail id"]}
                    onChangeText={(text) => {
                      setTempDetail((prev) => ({
                        ...prev,
                        order: {
                          ...prev.order,
                          composition: {
                            ...prev.order.composition,
                            ["Detail id"]: text,
                          },
                        },
                      }));
                    }}
                  ></TextInput>
                </View>
                <View
                  style={{ alignItems: "center", width: "100%", marginTop: 5 }}
                >
                  <Text style={{ color: "#fff", fontSize: 14, width: "85%" }}>
                    Workplace
                  </Text>
                  <TextInput
                    style={myStyles.input}
                    placeholder={isValidate ? "Заполните данное поле" : null}
                    placeholderTextColor={"red"}
                    value={tempDetail.order?.composition["Workplace"]}
                    onChangeText={(text) => {
                      setTempDetail((prev) => ({
                        ...prev,
                        order: {
                          ...prev.order,
                          composition: {
                            ...prev.order.composition,
                            ["Workplace"]: text,
                          },
                        },
                      }));
                    }}
                  ></TextInput>
                </View>
                <View
                  style={{ alignItems: "center", width: "100%", marginTop: 5 }}
                >
                  <Text style={{ color: "#fff", fontSize: 14, width: "85%" }}>
                    Worker
                  </Text>
                  <TextInput
                    style={myStyles.input}
                    value={tempDetail.order?.composition["Worker"]}
                    onChangeText={(text) => {
                      setTempDetail((prev) => ({
                        ...prev,
                        order: {
                          ...prev.order,
                          composition: {
                            ...prev.order.composition,
                            ["Worker"]: text,
                          },
                        },
                      }));
                    }}
                  ></TextInput>
                </View>
                <View
                  style={{ alignItems: "center", width: "100%", marginTop: 5 }}
                >
                  <Text style={{ color: "#fff", fontSize: 14, width: "85%" }}>
                    Worker id
                  </Text>
                  <TextInput
                    style={myStyles.input}
                    value={tempDetail.order?.composition["Worker id"]}
                    onChangeText={(text) => {
                      setTempDetail((prev) => ({
                        ...prev,
                        order: {
                          ...prev.order,
                          composition: {
                            ...prev.order.composition,
                            ["Worker id"]: text,
                          },
                        },
                      }));
                    }}
                  ></TextInput>
                </View>
                <Pressable
                  style={{
                    width: 204,
                    height: 70,
                    backgroundColor: "#0080FF",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 20,
                  }}
                  onPress={sendFormData}
                >
                  <Text style={{ color: "#fff", fontSize: 24 }}>OK!</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </Modal>
        {isCompleteWorhShiftVisible && (
          <CompleteWorkShift
            logOut={logOut}
            setIsModalVisible={setIsCompleteWorhShiftVisible}
          />
        )}
      </View>
    </Modal>
  );
};

const myStyles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000",
    flex: 1,
    paddingTop: 20,
    paddingBottom: 45,
  },
  menuItemBlock: {
    width: "100%",
    alignItems: "center",
  },
  menuItem: {
    width: "85%",
    height: 70,
    backgroundColor: "#242424",
    marginBottom: 15,
    justifyContent: "center",
    paddingLeft: 20,
  },
  menuItemText: {
    color: "#fff",
    fontFamily: "Montserrat",
    fontSize: 18,
  },
  input: {
    width: "85%",
    height: 60,
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: "Roboto",
  },
});

export default UsersMenuModal;
