import React, { Component } from "react";
import axios from "axios";
import { ScrollView, Dimensions, StyleSheet, Image } from "react-native";
import HTML from "react-native-render-html";
import {
    Container,
    Card,
    CardItem,
    Body,
    Content,
    Header,
    Left,
    Right,
    Icon,
    Title,
    Button,
    Text
} from "native-base";
export default class Detail extends Component {
    state = {
        NewsDetail: {},
        url:
            "https://apis.uzone.id/uzone/detail/" +
            this.props.navigation.getParam("SlugPost")
    };

    formatNews = data => {
        this.setState({
            NewsDetail: data
        });
    };

    getNews = () => {
        const url = this.state.url;
        console.log(url, "ini Url");
        return axios
            .get(url)
            .then(response => {
                console.log(response.data);
                this.formatNews(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    componentDidMount() {
        this.getNews();
    }

    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                    <Title>Detail</Title>
                </Body>
                <Right />
            </Header>
        )
    });
    render() {
        const NewsDetail = this.state.NewsDetail;
        console.log(NewsDetail.post_feature_img);
        return (
            <ScrollView style={{ flex: 1 }}>
                {/* <Content padder> */}
                <Card>
                    <CardItem>
                        <Text style={styles.Title}>
                            {NewsDetail.post_title}
                        </Text>
                    </CardItem>
                    <CardItem>
                        <Image
                            style={{
                                width: Dimensions.get("window").width - 30,
                                height: 200
                            }}
                            // style={{ width: 66, height: 58 }}
                            source={{
                                uri: NewsDetail.post_feature_img
                            }}
                        />
                    </CardItem>
                </Card>

                <Card>
                    <CardItem>
                        <HTML
                            html={NewsDetail.post_content}
                            imagesMaxWidth={Dimensions.get("window").width - 50}
                        />
                    </CardItem>
                </Card>
                {/* </Content> */}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    Title: {
        fontSize: 15,
        textAlign: "left",
        fontWeight: "bold"
    }
});
