import React from 'react';
import '/src/Help.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ScrollSpyComponent = () => {
    return (
        <div className="row" style={{ marginTop: '15rem' }}>
            <div className="col-4">
                {/* Navigation that stays centered on left side */}
                <div
                    id="list-example"
                    className="list-group sticky-navigation">
                    <a className="list-group-item list-group-item-action" href="#list-item-1">Item 1</a>
                    <a className="list-group-item list-group-item-action" href="#list-item-2">Item 2</a>
                    <a className="list-group-item list-group-item-action" href="#list-item-3">Item 3</a>
                    <a className="list-group-item list-group-item-action" href="#list-item-4">Item 4</a>
                </div>
            </div>
            <div className="col-8">
                {/* Example data */}

                <div
                    data-bs-spy="scroll"
                    data-bs-target="#list-example"
                    data-bs-smooth-scroll="true"
                    className="scrollspy-example"
                    tabIndex="0">
                    <h4 id="list-item-1">Item 1</h4>
                    <p style={{ textAlign: 'justify' }}>
                        This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                        This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                        This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                    </p>
                    <h4 id="list-item-2">Item 2</h4>
                    <p style={{ textAlign: 'justify' }}>
                        This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                        This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                        This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                    </p>
                    <h4 id="list-item-3">Item 3</h4>
                    <p style={{ textAlign: 'justify' }}>
                        This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                        This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                        This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                    </p>
                    <h4 id="list-item-4">Item 4</h4>
                    <p style={{ textAlign: 'justify' }}>
                        This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                        This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                        This is some placeholder content for the scrollspy page. Note that as you scroll down the page, the appropriate navigation link is highlighted. It's repeated throughout the component example. We keep adding some more example copy here to emphasize the scrolling and highlighting.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ScrollSpyComponent;
