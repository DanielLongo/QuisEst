import React, {Component} from 'react'

import { Input, Button, Form } from 'antd';
import "./input_text.css"

const { TextArea } = Input;

class InputText extends Component {
    constructor(props) {
        super(props)
        this.state = {
            message : ''
        }
        console.log(props)
        this.handleTextSubmitted = props.handleTextSubmitted
        this.handleTextSubmitted = this.handleTextSubmitted.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }


    handleChange(e) {
        this.setState({
            message: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        // console.log("A")
        // console.log(e)
        // console.log(this.state.message)
        this.props.handleTextSubmitted(this.state.message)
        // console.log("B")
    }

    render() {
        return (
            <div>
                <p className="paste-text">Paste your text in the box below</p>
                <form
                    onSubmit={this.handleSubmit}
                    className="send-message-form">
                    <TextArea
                        onChange={this.handleChange}
                        value={this.state.message}
                        placeholder="Paste your text below. Brackets and numbers will automatically be removed."
                        type="text"
                        className="text-box"
                        rows={20}
                    />
                    <Button
                        htmlType="submit"
                        className="text-box analyze-button"
                        type="danger" block>Click to Analyze</Button>


                    {/*<input*/}
                    {/*    onChange={this.handleChange}*/}
                    {/*    value={this.state.message}*/}
                    {/*    placeholder="Type your message and hit ENTER"*/}
                    {/*    type="text" />*/}
                </form>
                {/*<Form onSubmit={this.handleSubmit}>*/}
                {/*    <Form.Item>*/}
                {/*        {getFieldDecorator('username', {*/}
                {/*            rules: [{ required: true, message: 'Please input your username!' }],*/}
                {/*        })(*/}
                {/*        <TextArea onChange={this.props.handleTextChanged} className="text-box" placeholder="Paste your text below. Brackets and numbers will automatically be removed." rows={25} />*/}
                {/*        )}*/}
                {/*        </Form.Item>*/}
                {/*    <Form.Item>*/}
                {/*        <Button htmlType="submit" className="text-box analyze-button" type="danger" block>Click to Analyze</Button>*/}
                {/*    </Form.Item>*/}
                {/*</Form>*/}
            </div>
        )
    }
}

export default InputText
