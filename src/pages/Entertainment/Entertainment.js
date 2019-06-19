import React, { Component } from "react";
import axios from "axios";

import { StyleSheet, Image } from "react-native";
import {
    Container,
    Header,
    Title,
    Left,
    Icon,
    Right,
    Button,
    Body,
    Content,
    Text,
    Separator,
    ListItem
} from "native-base";
export default class Entertainment extends Component {
    state = {
        feedEntertainment: [],
        url: "https://apis.uzone.id/uzone/category/entertainment"
    };

    formatNews = (data, nextUrl) => {
        const newArr = [
            ...data.newsfeed_1.newsfeed,
            ...data.newsfeed_2.newsfeed,
            ...data.newsfeed_3.newsfeed,
            ...data.newsfeed_4.newsfeed
        ];

        this.setState({
            url: nextUrl,
            feedEntertainment: [...this.state.feedEntertainment, ...newArr]
        });
    };

    getNews = () => {
        const url = this.state.url;
        console.log(url, "ini Url");
        return axios
            .get(url)
            .then(response => {
                this.formatNews(
                    response.data.datas,
                    response.data.loadmore_parameter
                );
            })
            .catch(error => {
                console.log(error);
            });
    };

    componentDidMount() {
        this.getNews();
    }

    render() {
        let news = this.state.feedEntertainment;
        console.log(news);
        return (
            <Container>
                <Content padder>
                    <Separator bordered>
                        <Text>NEWS</Text>
                    </Separator>
                    {news.length ? (
                        news.map(res => {
                            return (
                                <ListItem
                                    style={styles.MainContainer}
                                    key={res.post_id}
                                    onPress={() => {
                                        /* 1. Navigate to the Details route with params */
                                        this.props.navigation.navigate(
                                            "Detail",
                                            {
                                                SlugPost: res.post_slug
                                            }
                                        );
                                    }}
                                >
                                    <Image
                                        style={styles.ImageStyle}
                                        source={{
                                            uri: res.feature_img + "/50"
                                        }}
                                    />
                                    <Text style={styles.Title}>
                                        {res.post_title}
                                    </Text>
                                </ListItem>
                            );
                        })
                    ) : (
                        <Text style={styles.Loading}>Loading</Text>
                    )}
                    <Button onPress={this.getNews} full light>
                        <Text style={styles.loadMore}>Loadmore News Gaes!</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

Entertainment.navigationOptions = ({ navigation }) => ({
    header: (
        <Header>
            <Left>
                <Button transparent onPress={() => navigation.openDrawer()}>
                    <Icon name="menu" />
                </Button>
            </Left>
            <Body>
                <Title>Entertainment</Title>
            </Body>
            <Right />
        </Header>
    )
});

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        paddingTop: -50,
        paddingLeft: 0,
        paddingRight: 20,
        alignItems: "stretch",
        marginTop: 10,
        marginRight: 30,
        justifyContent: "flex-start"
    },
    ImageStyle: {
        width: 50,
        height: 50,
        marginRight: 5
    },
    LoadMore: {
        fontWeight: "bold"
    },
    Title: {
        fontSize: 13
    },
    Loading: {
        fontSize: 15,
        alignItems: "center",
        justifyContent: "center"
    }
});
