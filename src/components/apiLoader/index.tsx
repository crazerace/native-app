import React, { Component } from 'react';
import { View } from 'react-native';
import { bindActionCreators, AnyAction, Dispatch, ActionCreatorsMapObject } from "redux";
import { connect } from "react-redux";
import { fetchTexts } from "../../state/texts";

interface StateProps { };

interface DispatchProps {
    fetchTexts: typeof fetchTexts
};

/**
 * This seems like an uneccecary component, could be done in a smarter way.
 */
class APILoader extends Component<DispatchProps> {
    componentDidMount() {
        this.props.fetchTexts();
    };

    render() {
        return <View />
    }
};

function mapStateToProps(): StateProps {
    return {};
};

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    return bindActionCreators({ fetchTexts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(APILoader);
