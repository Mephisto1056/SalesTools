import express from 'express';
import { Request, Response } from 'express';
import { competitiveAnalysisService } from '../services/competitiveAnalysisService';

const router = express.Router();

// 基础信息接口
interface BasicInfoRequest {
  customer_name: string;
  my_product: string;
  competitor_product: string;
}

// 步骤数据更新接口
interface StepUpdateRequest {
  session_id: string;
  step: number;
  data: any;
}

// 步骤1: 初始化分析会话
router.post('/init', async (req: Request, res: Response): Promise<void> => {
  try {
    const { customer_name, my_product, competitor_product }: BasicInfoRequest = req.body;

    // 验证输入参数
    if (!customer_name || !my_product || !competitor_product) {
      res.status(400).json({
        code: 400,
        message: '请提供完整的客户名称、我方产品和竞争对手产品信息',
        data: null
      });
      return;
    }

    // 创建分析会话
    const session = await competitiveAnalysisService.initSession({
      customer_name,
      my_product,
      competitor_product
    });

    res.json({
      code: 200,
      message: '分析会话初始化成功',
      data: session
    });

  } catch (error: any) {
    console.error('Session init error:', error);
    
    res.status(500).json({
      code: 500,
      message: error.message || '会话初始化失败，请稍后重试',
      data: null
    });
  }
});

// 步骤2: 生成产品信息分析
router.post('/step2/product-info', async (req: Request, res: Response): Promise<void> => {
  try {
    const { session_id } = req.body;

    if (!session_id) {
      res.status(400).json({
        code: 400,
        message: '请提供会话ID',
        data: null
      });
      return;
    }

    const productInfo = await competitiveAnalysisService.generateProductInfo(session_id);

    res.json({
      code: 200,
      message: '产品信息分析生成成功',
      data: productInfo
    });

  } catch (error: any) {
    console.error('Product info generation error:', error);
    
    res.status(500).json({
      code: 500,
      message: error.message || '产品信息分析失败，请稍后重试',
      data: null
    });
  }
});

// 步骤4: 生成独有利益分析
router.post('/step4/unique-benefits', async (req: Request, res: Response): Promise<void> => {
  try {
    const { session_id, important_factors } = req.body;

    if (!session_id) {
      res.status(400).json({
        code: 400,
        message: '请提供会话ID',
        data: null
      });
      return;
    }

    const uniqueBenefits = await competitiveAnalysisService.generateUniqueBenefits(session_id, important_factors);

    res.json({
      code: 200,
      message: '独有利益分析生成成功',
      data: uniqueBenefits
    });

  } catch (error: any) {
    console.error('Unique benefits generation error:', error);
    
    res.status(500).json({
      code: 500,
      message: error.message || '独有利益分析失败，请稍后重试',
      data: null
    });
  }
});

// 步骤5: 生成探索性问题
router.post('/step5/probing-questions', async (req: Request, res: Response): Promise<void> => {
  try {
    const { session_id, unique_benefits } = req.body;

    if (!session_id) {
      res.status(400).json({
        code: 400,
        message: '请提供会话ID',
        data: null
      });
      return;
    }

    const probingQuestions = await competitiveAnalysisService.generateProbingQuestions(session_id, unique_benefits);

    res.json({
      code: 200,
      message: '探索性问题生成成功',
      data: probingQuestions
    });

  } catch (error: any) {
    console.error('Probing questions generation error:', error);
    
    res.status(500).json({
      code: 500,
      message: error.message || '探索性问题生成失败，请稍后重试',
      data: null
    });
  }
});

// 步骤6: 生成共同利益分析
router.post('/step6/common-benefits', async (req: Request, res: Response): Promise<void> => {
  try {
    const { session_id } = req.body;

    if (!session_id) {
      res.status(400).json({
        code: 400,
        message: '请提供会话ID',
        data: null
      });
      return;
    }

    const commonBenefits = await competitiveAnalysisService.generateCommonBenefits(session_id);

    res.json({
      code: 200,
      message: '共同利益分析生成成功',
      data: commonBenefits
    });

  } catch (error: any) {
    console.error('Common benefits generation error:', error);
    
    res.status(500).json({
      code: 500,
      message: error.message || '共同利益分析失败，请稍后重试',
      data: null
    });
  }
});

// 步骤7: 生成劣势应对策略
router.post('/step7/weakness-strategies', async (req: Request, res: Response): Promise<void> => {
  try {
    const { session_id } = req.body;

    if (!session_id) {
      res.status(400).json({
        code: 400,
        message: '请提供会话ID',
        data: null
      });
      return;
    }

    const weaknessStrategies = await competitiveAnalysisService.generateWeaknessStrategies(session_id);

    res.json({
      code: 200,
      message: '劣势应对策略生成成功',
      data: weaknessStrategies
    });

  } catch (error: any) {
    console.error('Weakness strategies generation error:', error);
    
    res.status(500).json({
      code: 500,
      message: error.message || '劣势应对策略生成失败，请稍后重试',
      data: null
    });
  }
});

// 更新步骤数据
router.put('/step/:stepNumber', async (req: Request, res: Response): Promise<void> => {
  try {
    const { stepNumber } = req.params;
    const { session_id, data }: StepUpdateRequest = req.body;

    if (!session_id) {
      res.status(400).json({
        code: 400,
        message: '请提供会话ID',
        data: null
      });
      return;
    }

    await competitiveAnalysisService.updateStepData(session_id, parseInt(stepNumber), data);

    res.json({
      code: 200,
      message: '步骤数据更新成功',
      data: null
    });

  } catch (error: any) {
    console.error('Step update error:', error);
    
    res.status(500).json({
      code: 500,
      message: error.message || '步骤数据更新失败，请稍后重试',
      data: null
    });
  }
});

// 获取会话数据
router.get('/session/:sessionId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId } = req.params;

    const sessionData = await competitiveAnalysisService.getSessionData(sessionId);

    res.json({
      code: 200,
      message: '会话数据获取成功',
      data: sessionData
    });

  } catch (error: any) {
    console.error('Session data retrieval error:', error);
    
    res.status(500).json({
      code: 500,
      message: error.message || '会话数据获取失败，请稍后重试',
      data: null
    });
  }
});

// 生成最终报告
router.post('/generate-report', async (req: Request, res: Response): Promise<void> => {
  try {
    const { session_id } = req.body;

    if (!session_id) {
      res.status(400).json({
        code: 400,
        message: '请提供会话ID',
        data: null
      });
      return;
    }

    const report = await competitiveAnalysisService.generateFinalReport(session_id);

    res.json({
      code: 200,
      message: '最终报告生成成功',
      data: report
    });

  } catch (error: any) {
    console.error('Report generation error:', error);
    
    res.status(500).json({
      code: 500,
      message: error.message || '报告生成失败，请稍后重试',
      data: null
    });
  }
});

// AI辅助：单个维度建议
router.post('/ai-assist/dimension', async (req: Request, res: Response): Promise<void> => {
  try {
    const { dimension, customer_name, my_product, competitor_product } = req.body;

    console.log('AI维度建议请求:', { dimension, customer_name, my_product, competitor_product });

    if (!dimension) {
      res.status(400).json({
        code: 400,
        message: '请提供维度信息',
        data: null
      });
      return;
    }

    // 验证维度参数是否有效
    const validDimensions = ['features', 'benefits', 'price', 'supply_terms', 'service', 'consulting'];
    if (!validDimensions.includes(dimension)) {
      res.status(400).json({
        code: 400,
        message: `无效的维度参数: ${dimension}，有效值为: ${validDimensions.join(', ')}`,
        data: null
      });
      return;
    }

    // 使用默认值确保有基本信息
    const customerName = customer_name || '目标客户';
    const myProduct = my_product || '我方产品';
    const competitorProduct = competitor_product || '竞争对手产品';

    const suggestion = await competitiveAnalysisService.getDimensionSuggestionDirect(
      dimension,
      myProduct,
      competitorProduct,
      customerName
    );

    res.json({
      code: 200,
      message: 'AI建议生成成功',
      data: suggestion
    });

  } catch (error: any) {
    console.error('Dimension suggestion error:', error);
    console.error('Error stack:', error.stack);
    
    res.status(500).json({
      code: 500,
      message: error.message || 'AI建议生成失败，请稍后重试',
      data: null
    });
  }
});

// AI辅助：独有利益建议
router.post('/ai-assist/unique-benefits', async (req: Request, res: Response): Promise<void> => {
  try {
    const { session_id, comparison_data, important_factors } = req.body;

    if (!session_id) {
      res.status(400).json({
        code: 400,
        message: '请提供会话ID',
        data: null
      });
      return;
    }

    const suggestion = await competitiveAnalysisService.getUniqueBenefitsSuggestion(
      session_id,
      comparison_data || {},
      important_factors || []
    );

    res.json({
      code: 200,
      message: 'AI建议生成成功',
      data: suggestion
    });

  } catch (error: any) {
    console.error('Unique benefits suggestion error:', error);
    
    res.status(500).json({
      code: 500,
      message: error.message || 'AI建议生成失败，请稍后重试',
      data: null
    });
  }
});

// AI辅助：探索性问题建议
router.post('/ai-assist/probing-questions', async (req: Request, res: Response): Promise<void> => {
  try {
    const { session_id, unique_benefits } = req.body;

    if (!session_id) {
      res.status(400).json({
        code: 400,
        message: '请提供会话ID',
        data: null
      });
      return;
    }

    const suggestion = await competitiveAnalysisService.getProbingQuestionsSuggestion(
      session_id,
      unique_benefits || []
    );

    res.json({
      code: 200,
      message: 'AI建议生成成功',
      data: suggestion
    });

  } catch (error: any) {
    console.error('Probing questions suggestion error:', error);
    
    res.status(500).json({
      code: 500,
      message: error.message || 'AI建议生成失败，请稍后重试',
      data: null
    });
  }
});

// AI辅助：共同利益建议
router.post('/ai-assist/common-benefits', async (req: Request, res: Response): Promise<void> => {
  try {
    const { session_id, comparison_data } = req.body;

    if (!session_id) {
      res.status(400).json({
        code: 400,
        message: '请提供会话ID',
        data: null
      });
      return;
    }

    const suggestion = await competitiveAnalysisService.getCommonBenefitsSuggestion(
      session_id,
      comparison_data || {}
    );

    res.json({
      code: 200,
      message: 'AI建议生成成功',
      data: suggestion
    });

  } catch (error: any) {
    console.error('Common benefits suggestion error:', error);
    
    res.status(500).json({
      code: 500,
      message: error.message || 'AI建议生成失败，请稍后重试',
      data: null
    });
  }
});

// AI辅助：劣势应对建议
router.post('/ai-assist/weakness-strategy', async (req: Request, res: Response): Promise<void> => {
  try {
    const { session_id, comparison_data } = req.body;

    if (!session_id) {
      res.status(400).json({
        code: 400,
        message: '请提供会话ID',
        data: null
      });
      return;
    }

    const suggestion = await competitiveAnalysisService.getWeaknessStrategySuggestion(
      session_id,
      comparison_data || {}
    );

    res.json({
      code: 200,
      message: 'AI建议生成成功',
      data: suggestion
    });

  } catch (error: any) {
    console.error('Weakness strategy suggestion error:', error);
    
    res.status(500).json({
      code: 500,
      message: error.message || 'AI建议生成失败，请稍后重试',
      data: null
    });
  }
});

// 保留原有的一键生成接口（向后兼容）
router.post('/legacy', async (req: Request, res: Response): Promise<void> => {
  try {
    const { customer_name, my_product, competitor_product }: BasicInfoRequest = req.body;

    // 验证输入参数
    if (!customer_name || !my_product || !competitor_product) {
      res.status(400).json({
        code: 400,
        message: '请提供完整的客户名称、我方产品和竞争对手产品信息',
        data: null
      });
      return;
    }

    // 调用AI服务生成分析
    const analysisResult = await competitiveAnalysisService.generateAnalysis({
      customer_name,
      my_product,
      competitor_product
    });

    res.json({
      code: 200,
      message: '竞争分析生成成功',
      data: analysisResult
    });

  } catch (error: any) {
    console.error('Competitive analysis error:', error);
    
    res.status(500).json({
      code: 500,
      message: error.message || '竞争分析生成失败，请稍后重试',
      data: null
    });
  }
});

export default router;