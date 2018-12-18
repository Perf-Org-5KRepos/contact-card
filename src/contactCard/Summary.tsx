import * as React from "react";
import { ActionButton, Icon, Link, PersonaSize, Shimmer, ShimmerElementType } from "office-ui-fabric-react";
import { Persona } from "../Persona";
import { IPersonaProfile, PersonaShowMode } from "../Types";


export function renderSummary(
    profile: IPersonaProfile,
    manager: IPersonaProfile | undefined,
    isManagerLoading: boolean,
    onContactDetailsClick: () => void,
    onOrgDetailsClick: () => void,
    onPersonaClick: (profile: IPersonaProfile) => void
): React.ReactNode {
    return (
        <ul tabIndex={-1} className="summary">
            {renderContactSummary(profile, onContactDetailsClick)}
            {renderOrgSummary(manager, isManagerLoading, onOrgDetailsClick, onPersonaClick)}
        </ul>
    );
}


function renderContactSummary(profile: IPersonaProfile, onContactDetailsClick: () => void): React.ReactNode {
    return (
        <li>
            <ActionButton className="section-title" onClick={onContactDetailsClick}>
                Contact
            <Icon iconName="ChevronRight" className="chevron-icon" />
            </ActionButton>

            <div className="contact-row">
                <Icon iconName="Mail" className="contact-icon" />
                <Link href={`mailto:${profile.email}`} className="contact-link">{profile.email}</Link>
            </div>
            {
                profile.businessPhone &&
                <div className="contact-row">
                    <Icon iconName="Phone" className="contact-icon" />
                    <Link href={`tel:${profile.businessPhone}`}>{profile.businessPhone}</Link>
                </div>
            }
            <div className="contact-row">
                <Icon iconName="POI" className="contact-icon" />
                <span>{profile.officeLocation}</span>
                <span>&nbsp;{profile.city}</span>
            </div>
            <ActionButton className="more-details" onClick={onContactDetailsClick}>
                Show more
        </ActionButton>
        </li>
    );
}


function renderOrgSummary(
    manager: IPersonaProfile | undefined,
    isManagerLoading: boolean,
    onOrgDetailsClick: () => void,
    onPersonaClick: (profile: IPersonaProfile) => void
): React.ReactNode {
    return (
        <li>
            {(manager || isManagerLoading) &&
                <>
                    <ActionButton className="section-title" onClick={onOrgDetailsClick}>
                        Reports to
                    <Icon iconName="ChevronRight" className="chevron-icon" />
                    </ActionButton>
                    {
                        manager ?
                            <ActionButton className="person" onClick={() => onPersonaClick(manager)}>
                                <Persona
                                    id={manager.id}
                                    displayName={manager.displayName}
                                    showMode={PersonaShowMode.NameTitle}
                                    size={PersonaSize.size40}
                                />
                            </ActionButton>
                            :
                            <div className="person">
                                <Shimmer shimmerElements={[{ type: ShimmerElementType.circle, height: 40 }, { type: ShimmerElementType.gap, width: 12 }, { type: ShimmerElementType.line }]} width={"80%"} />
                            </div>
                    }
                </>
            }
            <ActionButton className="more-details" onClick={onOrgDetailsClick}>
                Show organization
            </ActionButton>
        </li>
    );
}