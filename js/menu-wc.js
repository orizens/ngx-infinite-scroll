'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ngx-infinite-scroll documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-1ac471649c255d8ed48f3a9025f96a96"' : 'data-target="#xs-components-links-module-AppModule-1ac471649c255d8ed48f3a9025f96a96"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-1ac471649c255d8ed48f3a9025f96a96"' :
                                            'id="xs-components-links-module-AppModule-1ac471649c255d8ed48f3a9025f96a96"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TestInnerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TestInnerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/InfiniteScrollModule.html" data-type="entity-link">InfiniteScrollModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-InfiniteScrollModule-c49c774aeeea6b5620dc2e514c1414c6"' : 'data-target="#xs-directives-links-module-InfiniteScrollModule-c49c774aeeea6b5620dc2e514c1414c6"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-InfiniteScrollModule-c49c774aeeea6b5620dc2e514c1414c6"' :
                                        'id="xs-directives-links-module-InfiniteScrollModule-c49c774aeeea6b5620dc2e514c1414c6"' }>
                                        <li class="link">
                                            <a href="directives/InfiniteScrollDirective.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules">InfiniteScrollDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppPage.html" data-type="entity-link">AppPage</a>
                            </li>
                            <li class="link">
                                <a href="classes/AxisResolver.html" data-type="entity-link">AxisResolver</a>
                            </li>
                            <li class="link">
                                <a href="classes/ScrollState.html" data-type="entity-link">ScrollState</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ListService.html" data-type="entity-link">ListService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/IDistanceRange.html" data-type="entity-link">IDistanceRange</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IInfiniteScrollAction.html" data-type="entity-link">IInfiniteScrollAction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IInfiniteScrollEvent.html" data-type="entity-link">IInfiniteScrollEvent</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPositionElements.html" data-type="entity-link">IPositionElements</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPositionStats.html" data-type="entity-link">IPositionStats</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IResolver.html" data-type="entity-link">IResolver</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IScrollConfig.html" data-type="entity-link">IScrollConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IScroller.html" data-type="entity-link">IScroller</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IScrollerDistance.html" data-type="entity-link">IScrollerDistance</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IScrollerProps.html" data-type="entity-link">IScrollerProps</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IScrollParams.html" data-type="entity-link">IScrollParams</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IScrollRegisterConfig.html" data-type="entity-link">IScrollRegisterConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IScrollState.html" data-type="entity-link">IScrollState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ITriggerEvents.html" data-type="entity-link">ITriggerEvents</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});