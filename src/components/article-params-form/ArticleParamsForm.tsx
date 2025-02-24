import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState, FormEvent, useRef } from 'react';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

export type ArticleParamsFormProps = {
	setAppState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { setAppState } = props;
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const [formValues, setFormValues] =
		useState<ArticleStateType>(defaultArticleState);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setAppState(formValues);
	};

	const handleFormFieldChange = (fieldName: string) => {
		return (value: OptionType) => {
			setFormValues((currentFormState) => ({
				...currentFormState,
				[fieldName]: value,
			}));
		};
	};
	const handleFormReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormValues(defaultArticleState);
		setAppState(defaultArticleState);
	};

	const handleOverlayClick = () => {
		setIsMenuOpen(false);
	};

	const handleSidebarClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen((currentIsOpened) => !currentIsOpened)}
			/>
			<div
				onClick={handleOverlayClick}
				className={`${styles.overlay} ${
					isMenuOpen ? styles.overlay_open : ''
				}`}></div>
			<aside
				ref={sidebarRef}
				className={`${styles.container} ${
					isMenuOpen ? styles.container_open : ''
				}`}
				onClick={handleSidebarClick}>
				<form
					className={styles.form}
					onSubmit={handleFormSubmit}
					onReset={handleFormReset}>
					<Text weight={800} size={31} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formValues.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={handleFormFieldChange('fontFamilyOption')}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOptions'
						options={fontSizeOptions}
						selected={formValues.fontSizeOption}
						onChange={handleFormFieldChange('fontSizeOption')}
					/>
					<Select
						title='Цвет шрифта'
						selected={formValues.fontColor}
						options={fontColors}
						onChange={handleFormFieldChange('fontColor')}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formValues.backgroundColor}
						options={fontColors}
						onChange={handleFormFieldChange('backgroundColor')}
					/>
					<Select
						title='Ширина контента'
						selected={formValues.contentWidth}
						options={contentWidthArr}
						onChange={handleFormFieldChange('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
